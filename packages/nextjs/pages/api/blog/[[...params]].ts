import { IsString } from 'class-validator'
import { Body, createHandler, Get, Param, Post, ValidationPipe } from 'next-api-decorators'
import { pinata, pinataGateway } from '~~/utils/pinata'

class CreateBlogDto {
  @IsString()
  title: string

  @IsString()
  content: string
}

class BlogHandler {
  @Get('/:id')
  async getBlog(@Param('id') id: string) {
    const { data } = await pinataGateway.get<{ title: string; content: string }>(`/${id}`)
    return data
  }

  @Post()
  async publishBlog(@Body(ValidationPipe) createBlogDto: CreateBlogDto) {
    const data = await pinata.pinJSONToIPFS({
      title: createBlogDto.title,
      content: createBlogDto.content,
    })
    return data
  }
}

export default createHandler(BlogHandler)
