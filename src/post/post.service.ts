import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post } from './entities/post.entity';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private postRepository: Repository<Post>,
  ) {}

  async createPost(post: CreatePostDto) {
    const newPost = await this.postRepository.create(post);

    await this.postRepository.save(newPost);

    return newPost;
  }

  getAllPosts() {
    return this.postRepository.find();
  }

  async getPostById(id: number) {
    const post = await this.postRepository.findOne(id);

    if (!post) throw new HttpException('Post not found', HttpStatus.NOT_FOUND);

    return post;
  }

  async updatePost(id: number, post: UpdatePostDto) {
    await this.postRepository.update(id, post);

    const updatedPost = await this.postRepository.findOne(id);

    if (!updatedPost)
      throw new HttpException('Post not found', HttpStatus.NOT_FOUND);

    return updatedPost;
  }

  async deletePost(id: number) {
    const deleteResponse = await this.postRepository.delete(id);

    if (!deleteResponse.affected)
      throw new HttpException('Post not found', HttpStatus.NOT_FOUND);

    return deleteResponse;
  }
}
