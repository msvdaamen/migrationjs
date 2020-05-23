import {Schema} from "./main/schema";


async function run() {
    const temp = Schema.create('temp', (blueprint => {
        blueprint.acces = true;
    }))
}
run();
