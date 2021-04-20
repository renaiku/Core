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
                TCS.debug(`${ConsoleColors.YELLOW}[${thread.id.split('-')[1]}] WARNING : ${ConsoleColors.RED}Took ${time} ms to execute !`);
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
                    TCS.debug(`${ConsoleColors.YELLOW} [${thread.id}] ${ConsoleColors.RED}Error encountered in thread : \n${e}`);
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
