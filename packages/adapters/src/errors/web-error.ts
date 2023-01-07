export class WebError {
	public constructor(
		public code: number,
		public original: Error
	) {}
}