export declare abstract class Migration {
    abstract up(): Promise<void>;
    abstract down(): Promise<void>;
}
