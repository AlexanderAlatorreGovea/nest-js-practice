import { IsNotEmpty, IsString } from 'class-validator';

export class CreatePostDto {
  content: string;
  title: string;
}
