"use strict";
class TcsDatabaseManager {
    constructor() {
        this.onDatabaseReadyList = [];
        this.connected = false;
        if (DATABASE_CONFIG.nosql) {
            this.currentDb = new MongoDatabase(() => {
                this.loadReadyList();
            });
        }
        else {
            this.currentDb = new MysqlDatabase(() => {
                this.loadReadyList();
            });
        }
    }
    loadReadyList() {
        this.connected = true;
        this.onDatabaseReadyList.forEach((fnc) => fnc());
    }
    onDatabaseReady(fnc) {
        if (!this.currentDb || !this.connected) {
            this.onDatabaseReadyList.push(fnc);
            return;
        }
        fnc();
    }
    database() {
        return this.currentDb;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3J2X2RhdGFiYXNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2NvcmUvbGlicmFpcmllcy9kYXRhYmFzZS9zcnZfZGF0YWJhc2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE1BQU0sa0JBQWtCO0lBS3ZCO1FBQ0MsSUFBSSxDQUFDLG1CQUFtQixHQUFHLEVBQUUsQ0FBQztRQUM5QixJQUFJLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQztRQUN2QixJQUFJLGVBQWUsQ0FBQyxLQUFLLEVBQUU7WUFDMUIsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLGFBQWEsQ0FBQyxHQUFHLEVBQUU7Z0JBQ3ZDLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztZQUN0QixDQUFDLENBQUMsQ0FBQztTQUNIO2FBQU07WUFDTixJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksYUFBYSxDQUFDLEdBQUcsRUFBRTtnQkFDdkMsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO1lBQ3RCLENBQUMsQ0FBQyxDQUFDO1NBQ0g7SUFDRixDQUFDO0lBRUQsYUFBYTtRQUNaLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDO1FBQ3RCLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxPQUFPLENBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUM7SUFDbEQsQ0FBQztJQUVELGVBQWUsQ0FBQyxHQUFhO1FBQzVCLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRTtZQUN2QyxJQUFJLENBQUMsbUJBQW1CLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ25DLE9BQU87U0FDUDtRQUVELEdBQUcsRUFBRSxDQUFDO0lBQ1AsQ0FBQztJQUVELFFBQVE7UUFDUCxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUM7SUFDdkIsQ0FBQztDQUNEIn0=