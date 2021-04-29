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
class MakeRequest {
    constructor(tables, query) {
        this.tables = tables;
        this.query = query;
    }
    /**
     * Sets the results count limit to the current request
     * @param count Results count
     * @returns Returns the current request
     */
    limit(count) {
        this.limitCount = count;
        return this;
    }
    /**
     * ONLY FOR MONGO | Sets the current order to give to the results
     * @param list Mongo sort request object
     * @returns Returns the current request
     */
    orderBy(list) {
        this.orderByList = list;
        return this;
    }
}
class MakeRequestSQL extends MakeRequest {
    constructor(con, tables, query) {
        super(tables, query);
        this.con = con;
    }
    /**
     * Converts a record to a SQL equation
     * @param record List of key / value to transform in sql equation
     * @param sep Separator between each equation
     * @returns The record transformed in a SQL equation
     */
    recordToSqlString(record, sep = ' ') {
        let result = [];
        for (const key in record) {
            const value = record[key];
            if (typeof value === 'string') {
                result.push(`${key}='${value}'`);
            }
            else {
                result.push(`${key}=${value}`);
            }
        }
        return result.join(sep);
    }
    execute() {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = `SELECT * FROM ${this.tables.join(',')} WHERE ${this.recordToSqlString(this.query)} ${this.limitCount > 0 ? `LIMIT ${this.limitCount}` : ''};`;
            const [result, _] = yield this.con.execute(sql);
            return result;
        });
    }
    executeOne() {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = `SELECT * FROM ${this.tables.join(',')} WHERE ${this.recordToSqlString(this.query)} LIMIT 1;`;
            const [result, _] = yield this.con.execute(sql);
            if (result.length == 0)
                return null;
            return result[0];
        });
    }
}
class MakeRequestMongo extends MakeRequest {
    constructor(db, collection, query) {
        super(collection, query);
        if (collection.length == 0)
            throw new Error('No collection designed during get request.');
        this.db = db;
    }
    execute() {
        return new Promise((resolve, reject) => {
            let currentRequest = this.db.collection(this.tables[0]).find(this.query);
            if (this.limitCount) {
                currentRequest = currentRequest.limit(this.limitCount);
            }
            if (this.orderByList) {
                currentRequest = currentRequest.sort(this.orderByList);
            }
            currentRequest.toArray((err, result) => {
                if (err)
                    reject(err);
                resolve(result);
            });
        });
    }
    executeOne() {
        return new Promise((resolve, reject) => {
            this.db
                .collection(this.tables[0])
                .findOne(this.query, (err, result) => {
                if (err)
                    reject(err);
                resolve(result);
            });
        });
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3J2X01ha2VSZXF1ZXN0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2NvcmUvbGlicmFpcmllcy9kYXRhYmFzZS9zcnZfTWFrZVJlcXVlc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLE1BQWUsV0FBVztJQVF6QixZQUFZLE1BQWdCLEVBQUUsS0FBMEI7UUFDdkQsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7UUFDckIsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7SUFDcEIsQ0FBQztJQUVEOzs7O09BSUc7SUFDSCxLQUFLLENBQUMsS0FBYTtRQUNsQixJQUFJLENBQUMsVUFBVSxHQUFHLEtBQUssQ0FBQztRQUN4QixPQUFPLElBQUksQ0FBQztJQUNiLENBQUM7SUFFRDs7OztPQUlHO0lBQ0gsT0FBTyxDQUFDLElBQVk7UUFDbkIsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUM7UUFDeEIsT0FBTyxJQUFJLENBQUM7SUFDYixDQUFDO0NBYUQ7QUFFRCxNQUFNLGNBQWUsU0FBUSxXQUFXO0lBRXZDLFlBQVksR0FBUSxFQUFFLE1BQWdCLEVBQUUsS0FBMEI7UUFDakUsS0FBSyxDQUFDLE1BQU0sRUFBRSxLQUFLLENBQUMsQ0FBQztRQUVyQixJQUFJLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQztJQUNoQixDQUFDO0lBRUQ7Ozs7O09BS0c7SUFDSyxpQkFBaUIsQ0FBQyxNQUEyQixFQUFFLEdBQUcsR0FBRyxHQUFHO1FBQy9ELElBQUksTUFBTSxHQUFhLEVBQUUsQ0FBQztRQUUxQixLQUFLLE1BQU0sR0FBRyxJQUFJLE1BQU0sRUFBRTtZQUN6QixNQUFNLEtBQUssR0FBRyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7WUFFMUIsSUFBSSxPQUFPLEtBQUssS0FBSyxRQUFRLEVBQUU7Z0JBQzlCLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxHQUFHLEtBQUssS0FB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