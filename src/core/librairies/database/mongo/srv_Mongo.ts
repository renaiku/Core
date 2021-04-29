class MongoDatabase implements database {
	private client;
	private db: any;

	constructor(onConnectionDone: Function) {
		const mongoClient = require('mongodb').MongoClient;
		const connectionUrl = `mongodb://${
			DATABASE_CONFIG.username
		}:${encodeURIComponent(DATABASE_CONFIG.password)}@${
			DATABASE_CONFIG.address
		}:${DATABASE_CONFIG.port}/`;

		this.client = new mongoClient(connectionUrl, { useUnifiedTopology: true });
		this.client.connect((err: Error) => {
			if (err) {
				console.error(err.message);
				return;
			}

			this.db = this.client.db(DATABASE_CONFIG.databaseName);
			onConnectionDone();
		});
	}

	async ensureColumns(table: string, columns: sqlColumn[]) {
		return;
	}

	/**
	 * Create a new db request that gets the data
	 * @param collection Name of the collection to get the values from
	 * @param selector Query of the current request
	 * @returns A make request object corresponding to the current request
	 */
	get(collection: string[], selector: Record<string, any>): MakeRequest {
		return new MakeRequestMongo(this.db, collection, selector);
	}

	/**
	 * Update the specified documents of the collection
	 * @param collection Name of the collection to update the values from
	 * @param selector Query of the current request
	 * @param newValues Values of the found documents to update
	 * @returns A promise from the request
	 */
	update(
		collection: string,
		selector: Record<string, any>,
		newValues: Record<string, any>,
	): Promise<void> {
		if (collection.length == 0)
			throw new Error('No collection designed during update request.');

		return new Promise((resolve, reject) => {
			this.db
				.collection(collection)
				.updateMany(selector, { $set: newValues }, (err: Error, _: any) => {
					if (err) reject(err);
					resolve();
				});
		});
	}

	/**
	 * Delete the specified documents of the collection
	 * @param collection Name of the collection to delete the values from
	 * @param query Query of the current request
	 * @returns A promise from the request
	 */
	delete(collection: string, query: Record<string, any>): Promise<void> {
		return new Promise((resolve, reject) => {
			this.db.collection(collection).deleteMany(query, (err: Error, _: any) => {
				if (err) reject(err);
				resolve();
			});
		});
	}

	/**
	 * Insert the specified document in the collection
	 * @param collection Name of the collection to insert the document to
	 * @param newDocument The new document to insert
	 * @returns A promise from the request
	 */
	insert(collection: string, newDocument: Record<string, any>): Promise<void> {
		return new Promise((resolve, reject) => {
			this.db
				.collection(collection)
				.insertOne(newDocument, (err: Error, _: any) => {
					if (err) reject(err);
					resolve();
				});
		});
	}
}
