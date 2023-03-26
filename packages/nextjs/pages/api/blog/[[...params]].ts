import { IsString } from 'class-validator'
import { Body, createHandler, Get, Param, Post, ValidationPipe } from 'next-api-decorators'
import dayjs from 'dayjs'
import { pinata, ipfsGateway } from '~~/utils/pinata'

class CreateBlogDto {
  @IsString()
  title: string

  @IsString()
  content: string
}

class BlogHandler {
  @Get('/:id')
  async getBlog(@Param('id') id: string) {
    const { data } = await ipfsGateway.get<{ title: string; content: string; timestamp?: string }>(`/${id}`, {
      headers: {
        Accept: 'application/json',
      },
    })
    return data
  }

  @Post()
  async publishBlog(@Body(ValidationPipe) createBlogDto: CreateBlogDto) {
    const data = await pinata.pinJSONToIPFS({
      title: createBlogDto.title,
      content: createBlogDto.content,
      timestamp: dayjs().toISOString(),
    })
    return data
  }
}

export default createHandler(BlogHandler)
