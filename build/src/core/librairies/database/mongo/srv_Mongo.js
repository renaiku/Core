"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
class MongoDatabase {
    constructor(onConnectionDone) {
        const mongoClient = require('mongodb').MongoClient;
        const connectionUrl = `mongodb://${DATABASE_CONFIG.username}:${encodeURIComponent(DATABASE_CONFIG.password)}@${DATABASE_CONFIG.address}:${DATABASE_CONFIG.port}/`;
        this.client = new mongoClient(connectionUrl, { useUnifiedTopology: true });
        this.client.connect((err) => {
            if (err) {
                console.error(err.message);
                return;
            }
            this.db = this.client.db(DATABASE_CONFIG.databaseName);
            onConnectionDone();
        });
    }
    ensureColumns(table, columns) {
        return __awaiter(this, void 0, void 0, function* () {
            return;
        });
    }
    /**
     * Create a new db request that gets the data
     * @param collection Name of the collection to get the values from
     * @param selector Query of the current request
     * @returns A make request object corresponding to the current request
     */
    get(collection, selector) {
        return new MakeRequestMongo(this.db, collection, selector);
    }
    /**
     * Update the specified documents of the collection
     * @param collection Name of the collection to update the values from
     * @param selector Query of the current request
     * @param newValues Values of the found documents to update
     * @returns A promise from the request
     */
    update(collection, selector, newValues) {
        if (collection.length == 0)
            throw new Error('No collection designed during update request.');
        return new Promise((resolve, reject) => {
            this.db
                .collection(collection)
                .updateMany(selector, { $set: newValues }, (err, _) => {
                if (err)
                    reject(err);
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
    delete(collection, query) {
        return new Promise((resolve, reject) => {
            this.db.collection(collection).deleteMany(query, (err, _) => {
                if (err)
                    reject(err);
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
    insert(collection, newDocument) {
        return new Promise((resolve, reject) => {
            this.db
                .collection(collection)
                .insertOne(newDocument, (err, _) => {
                if (err)
                    reject(err);
                resolve();
            });
        });
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3J2X01vbmdvLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2NvcmUvbGlicmFpcmllcy9kYXRhYmFzZS9tb25nby9zcnZfTW9uZ28udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLE1BQU0sYUFBYTtJQUlsQixZQUFZLGdCQUEwQjtRQUNyQyxNQUFNLFdBQVcsR0FBRyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUMsV0FBVyxDQUFDO1FBQ25ELE1BQU0sYUFBYSxHQUFHLGFBQ3JCLGVBQWUsQ0FBQyxRQUNqQixJQUFJLGtCQUFrQixDQUFDLGVBQWUsQ0FBQyxRQUFRLENBQUMsSUFDL0MsZUFBZSxDQUFDLE9BQ2pCLElBQUksZUFBZSxDQUFDLElBQUksR0FBRyxDQUFDO1FBRTVCLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxXQUFXLENBQUMsYUFBYSxFQUFFLEVBQUUsa0JBQWtCLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQztRQUMzRSxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEdBQVUsRUFBRSxFQUFFO1lBQ2xDLElBQUksR0FBRyxFQUFFO2dCQUNSLE9BQU8sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDO2dCQUMzQixPQUFPO2FBQ1A7WUFFRCxJQUFJLENBQUMsRUFBRSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLGVBQWUsQ0FBQyxZQUFZLENBQUMsQ0FBQztZQUN2RCxnQkFBZ0IsRUFBRSxDQUFDO1FBQ3BCLENBQUMsQ0FBQyxDQUFDO0lBQ0osQ0FBQztJQUVLLGFBQWEsQ0FBQyxLQUFhLEVBQUUsT0FBb0I7O1lBQ3RELE9BQU87UUFDUixDQUFDO0tBQUE7SUFFRDs7Ozs7T0FLRztJQUNILEdBQUcsQ0FBQyxVQUFvQixFQUFFLFFBQTZCO1FBQ3RELE9BQU8sSUFBSSxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsRUFBRSxFQUFFLFVBQVUsRUFBRSxRQUFRLENBQUMsQ0FBQztJQUM1RCxDQUFDO0lBRUQ7Ozs7OztPQU1HO0lBQ0gsTUFBTSxDQUNMLFVBQWtCLEVBQ2xCLFFBQTZCLEVBQzdCLFNBQThCO1FBRTlCLElBQUksVUFBVSxDQUFDLE1BQU0sSUFBSSxDQUFDO1lBQ3pCLE1BQU0sSUFBSSxLQUFLLENBQUMsK0NBQStDLENBQUMsQ0FBQztRQUVsRSxPQUFPLElBQUksT0FBTyxDQUFDLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxFQUFFO1lBQ3RDLElBQUksQ0FBQyxFQUFFO2lCQUNMLFVBQVUsQ0FBQyxVQUFVLENBQUM7aUJBQ3RCLFVBQVUsQ0FBQyxRQUFRLEVBQUUsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLEVBQUUsQ0FBQyxHQUFVLEVBQUUsQ0FBTSxFQUFFLEVBQUU7Z0JBQ2pFLElBQUksR0FBRztvQkFBRSxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQ3JCLE9BQU8sRUFBRSxDQUFDO1lBQ1gsQ0FBQyxDQUFDLENBQUM7UUFDTCxDQUFDLENBQUMsQ0FBQztJQUNKLENBQUM7SUFFRDs7Ozs7T0FLRztJQUNILE1BQU0sQ0FBQyxVQUFrQixFQUFFLEtBQTBCO1FBQ3BELE9BQU8sSUFBSSxPQUFPLENBQUMsQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUU7WUFDdEMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxVQUFVLENBQUMsVUFBVSxDQUFDLENBQUMsVUFBVSxDQUFDLEtBQUssRUFBRSxDQUFDLEdBQVUsRUFBRSxDQUFNLEVBQUUsRUFBRTtnQkFDdkUsSUFBSSxHQUFHO29CQUFFLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFDckIsT0FBTyxFQUFFLENBQUM7WUFDWCxDQUFDLENBQUMsQ0FBQztRQUNKLENBQUMsQ0FBQyxDQUFDO0lBQ0osQ0FBQztJQUVEOzs7OztPQUtHO0lBQ0gsTUFBTSxDQUFDLFVBQWtCLEVBQUUsV0FBZ0M7UUFDMUQsT0FBTyxJQUFJLE9BQU8sQ0FBQyxDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsRUFBRTtZQUN0QyxJQUFJLENBQUMsRUFBRTtpQkFDTCxVQUFVLENBQUMsVUFBVSxDQUFDO2lCQUN0QixTQUFTLENBQUMsV0FBVyxFQUFFLENBQUMsR0FBVSxFQUFFLENBQU0sRUFBRSxFQUFFO2dCQUM5QyxJQUFJLEdBQUc7b0JBQUUsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUNyQixPQUFPLEVBQUUsQ0FBQztZQUNYLENBQUMsQ0FBQyxDQUFDO1FBQ0wsQ0FBQyxDQUFDLENBQUM7SUFDSixDQUFDO0NBQ0QifQ==