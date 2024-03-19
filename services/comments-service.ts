import commentsJson from './comments.json';
import type { Comments } from './models';

let comments: Comments[] = [];

export class CommentsService {
	static getAllComments() {
		comments = commentsJson;

		return new Response(JSON.stringify(comments), {
			headers: { 'Content-type': 'application/json' },
			status: 200,
		});
	}

	static getCommentById(id: number) {
		const comment = comments.find((comment) => comment.id === id);

		if (!comment) {
			return new Response('POST NOT FOUND', { status: 404 });
		}

		return new Response(JSON.stringify(comment), {
			headers: { 'Content-Type': 'application/json' },
			status: 200,
		});
	}
}
