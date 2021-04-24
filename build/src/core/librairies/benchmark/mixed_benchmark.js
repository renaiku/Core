"use strict";
/**
 * @author Maxence Leguede
 * @version 0.1.0
 * @since 0.1.0
 */
class TcsBenchmark {
    /**
     * Starts the timer for the benchmark
     */
    constructor() {
        this.start = GetGameTimer();
    }
    /**
     * Stop the timer of the current benchmark and tells the ms difference between the start and the stop
     * @returns The time difference in ms
     */
    stop() {
        const difference = GetGameTimer() - this.start;
        return difference;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWl4ZWRfYmVuY2htYXJrLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2NvcmUvbGlicmFpcmllcy9iZW5jaG1hcmsvbWl4ZWRfYmVuY2htYXJrLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7OztHQUlHO0FBRUgsTUFBTSxZQUFZO0lBR2pCOztPQUVHO0lBQ0g7UUFDQyxJQUFJLENBQUMsS0FBSyxHQUFHLFlBQVksRUFBRSxDQUFDO0lBQzdCLENBQUM7SUFFRDs7O09BR0c7SUFDSCxJQUFJO1FBQ0gsTUFBTSxVQUFVLEdBQUcsWUFBWSxFQUFFLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztRQUMvQyxPQUFPLFVBQVUsQ0FBQztJQUNuQixDQUFDO0NBQ0QifQ==