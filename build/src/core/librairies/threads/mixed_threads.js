"use strict";
/**
 * @author Maxence Leguede
 * @version 0.1.0
 * @since 0.1.0
 */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
class TcsThread {
    /**
     * Create a new thread with the specified delay
     * @param timer Delay between each executions
     */
    constructor(timer) {
        /**
         * Execute a thread function in debug mode
         * @param thread Thread to execute
         */
        this.debugExec = (thread) => {
            const benchmark = new TcsBenchmark();
            thread.exec();
            const time = benchmark.stop();
            if (time >= 1) {
                TCS.warning(`Thread ${thread.id.split('-')[1]} took ${time} ms to execute !`);
            }
        };
        /**
         * Wait the specified time
         * @param time Time of the delay
         * @returns Promise that is resolved after the delay
         */
        this.delay = (time) => new Promise((resolve, _) => setTimeout(resolve, time));
        this.execs = [];
        this.timer = timer;
        this.isThreadFull = false;
        this.threadId = +new Date();
        this.tick = setTick(() => __awaiter(this, void 0, void 0, function* () {
            yield this.delay(this.timer);
            const benchmark = new TcsBenchmark();
            this.execs.forEach((thread) => {
                try {
                    if (TCS_CONFIG.debugMode)
                        this.debugExec(thread);
                    else
                        thread.exec();
                }
                catch (e) {
                    TCS.error(`Error encountered in thread ${ConsoleColors.YELLOW}${thread.id}${ConsoleColors.RED}: \n${e}`);
                }
            });
            const time = benchmark.stop();
            if (time > TCS_CONFIG.maxExecTimePerThread)
                this.isThreadFull = true;
        }));
    }
    /**
     * Get current thread delay between each executions
     * @returns Thread delay
     */
    getThreadTimer() {
        return this.timer;
    }
    /**
     * Append a function to execute after the delay in the current thread
     * @param module Module the thread comes from
     * @param exec Function to execute
     * @returns Created thread id
     */
    appendThread(module, exec) {
        const threadId = `${this.threadId}-${module.getId()}-${this.execs.length}`;
        const thread = {
            id: threadId,
            exec: exec,
        };
        this.execs.push(thread);
        return threadId;
    }
    /**
     * Stop and remove the specified thread
     * @param id Id of the thread to remove
     * @returns True if the current thread has to be deleted, false if not
     */
    removeThread(id) {
        this.execs = this.execs.filter((thread) => thread.id !== id);
        if (this.execs.length == 0) {
            clearTick(this.tick);
            return true;
        }
        return false;
    }
    /**
     * Stop and remove the specified thread
     * @param module Module from which the threads have to be stopped
     * @returns True if the current thread has to be deleted, false if not
     */
    removeModuleThreads(module) {
        this.execs = this.execs.filter((thread) => thread.id.split('-')[1] !== module.getId());
        if (this.execs.length == 0) {
            clearTick(this.tick);
            return true;
        }
        return false;
    }
    /**
     * Get if a thread is actually contained in
     * @param id Id to search for
     * @returns True if the thread is contained, false else
     */
    containsThreadById(id) {
        return this.execs.find((thread) => thread.id === id) != null;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWl4ZWRfdGhyZWFkcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9jb3JlL2xpYnJhaXJpZXMvdGhyZWFkcy9taXhlZF90aHJlYWRzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7OztHQUlHOzs7Ozs7Ozs7O0FBRUgsTUFBTSxTQUFTO0lBUWQ7OztPQUdHO0lBQ0gsWUFBWSxLQUFhO1FBa0N6Qjs7O1dBR0c7UUFDSCxjQUFTLEdBQUcsQ0FBQyxNQUFxQixFQUFFLEVBQUU7WUFDckMsTUFBTSxTQUFTLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztZQUNyQyxNQUFNLENBQUMsSUFBSSxFQUFFLENBQUM7WUFDZCxNQUFNLElBQUksR0FBRyxTQUFTLENBQUMsSUFBSSxFQUFFLENBQUM7WUFFOUIsSUFBSSxJQUFJLElBQUksQ0FBQyxFQUFFO2dCQUNkLEdBQUcsQ0FBQyxPQUFPLENBQ1YsVUFBVSxNQUFNLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxJQUFJLGtCQUFrQixDQUNoRSxDQUFDO2FBQ0Y7UUFDRixDQUFDLENBQUM7UUFFRjs7OztXQUlHO1FBQ0gsVUFBSyxHQUFHLENBQUMsSUFBWSxFQUFpQixFQUFFLENBQ3ZDLElBQUksT0FBTyxDQUFDLENBQUMsT0FBTyxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUMsVUFBVSxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDO1FBdkR2RCxJQUFJLENBQUMsS0FBSyxHQUFHLEVBQUUsQ0FBQztRQUNoQixJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztRQUNuQixJQUFJLENBQUMsWUFBWSxHQUFHLEtBQUssQ0FBQztRQUMxQixJQUFJLENBQUMsUUFBUSxHQUFHLENBQUMsSUFBSSxJQUFJLEVBQUUsQ0FBQztRQUU1QixJQUFJLENBQUMsSUFBSSxHQUFHLE9BQU8sQ0FBQyxHQUFTLEVBQUU7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