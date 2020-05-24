export declare abstract class Migration {
    abstract up(): void;
    abstract down(): void;
    migrate(): void;
}
