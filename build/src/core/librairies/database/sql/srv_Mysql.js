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
class MysqlDatabase {
    constructor(onConnectionDone) {
        const mysql = require('mysql2');
        const connectionParameters = {
            host: DATABASE_CONFIG.address,
            port: DATABASE_CONFIG.port,
            user: DATABASE_CONFIG.username,
            password: encodeURIComponent(DATABASE_CONFIG.password),
            database: DATABASE_CONFIG.databaseName,
            waitForConnections: true,
            connectionLimit: 20,
        };
        const connectToDb = () => __awaiter(this, void 0, void 0, function* () {
            const pool = yield mysql.createPool(connectionParameters);
            this.client = pool.promise();
            onConnectionDone();
        });
        connectToDb();
    }
    /**
     * Execute the specified query and returns it's result
     * @param sql Sql query to execute
     * @returns A promise resolving the query's result
     */
    asyncQuery(sql) {
        return __awaiter(this, void 0, void 0, function* () {
            const [result, _] = yield this.client.execute(sql);
            return result;
        });
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
    /**
     * Will create the table if it doesn't exist
     * @param table Name of the table to create if it doesn't exist
     */
    ensureTables(table) {
        return __awaiter(this, void 0, void 0, function* () {
            if (table) {
                const request = `CREATE TABLE IF NOT EXISTS \`${table}\` (\`id\` int(11) NOT NULL auto_increment, PRIMARY KEY  (\`id\`));`;
                yield this.asyncQuery(request);
            }
            return;
        });
    }
    /**
     * Will create the table with the specified columns if they don't exist
     * @param table Table to create the columns in
     * @param columns List of the columns, specified by their name and values type
     */
    ensureColumns(table, columns) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.ensureTables(table);
            const sqlColumns = columns.map((column) => `${column.column} ${column.type}`);
            const request = `ALTER TABLE ${table} ADD COLUMN IF NOT EXISTS (${sqlColumns.join(', ')});`;
            yield this.asyncQuery(request);
            return;
        });
    }
    /**
     * Create a new db request that gets the data
     * @param table Name of the table to get the values from
     * @param selector Query of the current request
     * @returns A make request object corresponding to the current request
     */
    get(table, selector) {
        return new MakeRequestSQL(this.client, table, selector);
    }
    /**
     * Update the specified documents of the table
     * @param table Name of the table to update the values from
     * @param selector Query of the current request
     * @param newValues Values of the found documents to update
     * @returns A promise from the request
     */
    update(table, selector, newValues) {
        return new Promise((resolve, reject) => {
            const sql = `UPDATE ${table} SET ${this.recordToSqlString(newValues, ', ')} WHERE ${this.recordToSqlString(selector, ' AND ')};`;
            this.asyncQuery(sql).then(resolve).catch(reject);
        });
    }
    /**
     * Delete the specified documents of the table
     * @param table Name of the table to delete the values from
     * @param query Query of the current request
     * @returns A promise from the request
     */
    delete(table, query) {
        return new Promise((resolve, reject) => {
            const sql = `DELETE FROM ${table} WHERE ${this.recordToSqlString(query, ', ')};`;
            this.asyncQuery(sql).then(resolve).catch(reject);
        });
    }
    /**
     * Insert the specified document in the table
     * @param table Name of the table to insert the document to
     * @param newDocument The new document to insert
     * @returns A promise from the request
     */
    insert(table, newDocument) {
        let keys = [];
        let values = [];
        for (const key in newDocument) {
            const value = newDocument[key];
            keys.push(key);
            if (typeof value === 'string') {
                values.push(`'${value}'`);
            }
            else {
                values.push(`${value}`);
            }
        }
        return new Promise((resolve, reject) => {
            const sql = `INSERT INTO ${table} (${keys.join(',')}) VALUES (${values.join(',')});`;
            this.asyncQuery(sql).then(resolve).catch(reject);
        });
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3J2X015c3FsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2NvcmUvbGlicmFpcmllcy9kYXRhYmFzZS9zcWwvc3J2X015c3FsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxNQUFNLGFBQWE7SUFHbEIsWUFBWSxnQkFBMEI7UUFDckMsTUFBTSxLQUFLLEdBQUcsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ2hDLE1BQU0sb0JBQW9CLEdBQUc7WUFDNUIsSUFBSSxFQUFFLGVBQWUsQ0FBQyxPQUFPO1lBQzdCLElBQUksRUFBRSxlQUFlLENBQUMsSUFBSTtZQUMxQixJQUFJLEVBQUUsZUFBZSxDQUFDLFFBQVE7WUFDOUIsUUFBUSxFQUFFLGtCQUFrQixDQUFDLGVBQWUsQ0FBQyxRQUFRLENBQUM7WUFDdEQsUUFBUSxFQUFFLGVBQWUsQ0FBQyxZQUFZO1lBRXRDLGtCQUFrQixFQUFFLElBQUk7WUFDeEIsZUFBZSxFQUFFLEVBQUU7U0FDbkIsQ0FBQztRQUVGLE1BQU0sV0FBVyxHQUFHLEdBQVMsRUFBRTtZQUM5QixNQUFNLElBQUksR0FBRyxNQUFNLEtBQUssQ0FBQyxVQUFVLENBQUMsb0JBQW9CLENBQUMsQ0FBQztZQUMxRCxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztZQUM3QixnQkFBZ0IsRUFBRSxDQUFDO1FBQ3BCLENBQUMsQ0FBQSxDQUFDO1FBRUYsV0FBVyxFQUFFLENBQUM7SUFDZixDQUFDO0lBRUQ7Ozs7T0FJRztJQUNXLFVBQVUsQ0FBQyxHQUFXOztZQUNuQyxNQUFNLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQyxHQUFHLE1BQU0sSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDbkQsT0FBTyxNQUFNLENBQUM7UUFDZixDQUFDO0tBQUE7SUFFRDs7Ozs7T0FLRztJQUNLLGlCQUFpQixDQUFD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