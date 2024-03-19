import { serve } from 'bun';
import figlet from 'figlet';

import { CommentsService } from './services/comments-service';

// const server = Bun.serve({
// 	port: 3000,
// 	fetch(req) {
// 		const message = 'This is Bun!!';
// 		const body = figlet.textSync(message);
// 		return new Response(body);
// 	},
// });

const PORT = 3000;

const server = serve({
	port: PORT,
	fetch(request: Request) {
		const { method } = request;
		const { pathname } = new URL(request.url);
		const pathRegexForID = /^\/api\/comments\/(\d+)$/;

		if (method === 'GET' && pathname === '/api/comments') {
			return CommentsService.getAllComments();
		}

		if (method === 'GET') {
			const match = pathname.match(pathRegexForID);
			const id = match && match[1];

			if (id) {
				return CommentsService.getCommentById(+id);
			}
		}

		const message = 'This is and API with Bun!!!';
		const body = figlet.textSync(message);
		return new Response(body, { status: 200 });
	},
});

console.info(`Listening on http://localhost:${server.port}...`);
