

export abstract class Migration {

    abstract async up(): Promise<void>;

    abstract async down(): Promise<void>;
}
