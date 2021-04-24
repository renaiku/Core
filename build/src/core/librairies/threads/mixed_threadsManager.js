"use strict";
/**
 * @author Maxence Leguede
 * @version 0.1.0
 * @since 0.1.0
 */
class TcsThreadsManager {
    /**
     * Initialize the threads manager
     * Should only be called by the core
     */
    constructor() {
        this.threadsList = [];
    }
    /**
     * Create a new thread
     * @param module Module that creates the thread
     * @param timer Delay between each executions
     * @param exec Function to execute
     * @returns Created thread id
     */
    createThread(module, timer, exec) {
        let found = false;
        const currentThread = this.threadsList.find((thread) => {
            if (thread.getThreadTimer() == timer && !thread.isThreadFull) {
                found = true;
                return true;
            }
            return false;
        }) || new TcsThread(timer);
        if (!found) {
            this.threadsList.push(currentThread);
        }
        return currentThread.appendThread(module, exec);
    }
    /**
     * Stop and deletes a thread
     * @param id Id of the thread to delete
     */
    removeThread(id) {
        this.threadsList.forEach((thread, index) => {
            if (thread.containsThreadById(id)) {
                const shouldDeleteThread = thread.removeThread(id);
                if (shouldDeleteThread) {
                    this.threadsList.splice(index, 1);
                }
                return;
            }
        });
    }
    /**
     * Stop all the threads that come from the specified module
     * @param module Module from which the threads to stop come from
     */
    removeThreadByModule(module) {
        this.threadsList.forEach((thread, index) => {
            const shouldDeleteThread = thread.removeModuleThreads(module);
            if (shouldDeleteThread) {
                this.threadsList.splice(index, 1);
                return this.removeThreadByModule(module);
            }
        });
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWl4ZWRfdGhyZWFkc01hbmFnZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvY29yZS9saWJyYWlyaWVzL3RocmVhZHMvbWl4ZWRfdGhyZWFkc01hbmFnZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7O0dBSUc7QUFFSCxNQUFNLGlCQUFpQjtJQUd0Qjs7O09BR0c7SUFDSDtRQUNDLElBQUksQ0FBQyxXQUFXLEdBQUcsRUFBRSxDQUFDO0lBQ3ZCLENBQUM7SUFFRDs7Ozs7O09BTUc7SUFDSCxZQUFZLENBQUMsTUFBaUIsRUFBRSxLQUFhLEVBQUUsSUFBYztRQUM1RCxJQUFJLEtBQUssR0FBRyxLQUFLLENBQUM7UUFDbEIsTUFBTSxhQUFhLEdBQ2xCLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUMsTUFBTSxFQUFFLEVBQUU7WUFDaEMsSUFBSSxNQUFNLENBQUMsY0FBYyxFQUFFLElBQUksS0FBSyxJQUFJLENBQUMsTUFBTSxDQUFDLFlBQVksRUFBRTtnQkFDN0QsS0FBSyxHQUFHLElBQUksQ0FBQztnQkFDYixPQUFPLElBQUksQ0FBQzthQUNaO1lBQ0QsT0FBTyxLQUFLLENBQUM7UUFDZCxDQUFDLENBQUMsSUFBSSxJQUFJLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUM1QixJQUFJLENBQUMsS0FBSyxFQUFFO1lBQ1gsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUM7U0FDckM7UUFFRCxPQUFPLGFBQWEsQ0FBQyxZQUFZLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ2pELENBQUM7SUFFRDs7O09BR0c7SUFDSCxZQUFZLENBQUMsRUFBVTtRQUN0QixJQUFJLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxDQUFDLE1BQU0sRUFBRSxLQUFLLEVBQUUsRUFBRTtZQUMxQyxJQUFJLE1BQU0sQ0FBQyxrQkFBa0IsQ0FBQyxFQUFFLENBQUMsRUFBRTtnQkFDbEMsTUFBTSxrQkFBa0IsR0FBRyxNQUFNLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxDQUFDO2dCQUVuRCxJQUFJLGtCQUFrQixFQUFFO29CQUN2QixJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUM7aUJBQ2xDO2dCQUVELE9BQU87YUFDUDtRQUNGLENBQUMsQ0FBQyxDQUFDO0lBQ0osQ0FBQztJQUVEOzs7T0FHRztJQUNILG9CQUFvQixDQUFDLE1BQWlCO1FBQ3JDLElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLENBQUMsTUFBTSxFQUFFLEtBQUssRUFBRSxFQUFFO1lBQzFDLE1BQU0sa0JBQWtCLEdBQUcsTUFBTSxDQUFDLG1CQUFtQixDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBRTlELElBQUksa0JBQWtCLEVBQUU7Z0JBQ3ZCLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQztnQkFDbEMsT0FBTyxJQUFJLENBQUMsb0JBQW9CLENBQUMsTUFBTSxDQUFDLENBQUM7YUFDekM7UUFDRixDQUFDLENBQUMsQ0FBQztJQUNKLENBQUM7Q0FDRCJ9