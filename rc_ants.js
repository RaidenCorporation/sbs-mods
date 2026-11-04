if (typeof elements === "undefined") {
    elements = {};
}

// Advanced Ant Colony & Ant Attacks Mod for Sandboxels
// Made by Raiden Corporation

function initMyAntMod() {
    // 1. Worker Ants Reactions & Custom Carrying Logic
    if (elements.ant) {
        elements.ant.reactions = elements.ant.reactions || {};
        
        // Ants eat normal food, sugar, and hunt termites
        elements.ant.reactions["food"] = { "elem1": "ant", "elem2": null };
        elements.ant.reactions["sugar"] = { "elem1": "ant", "elem2": null };
        elements.ant.reactions["termite"] = { "elem1": "ant", "elem2": "dead_bug" };

        // Ants drink liquids and store the item inside a pixel property instead of transforming
        elements.ant.reactions["juice"] = {
            func: (pixel1, pixel2) => {
                pixel1.carryingFood = true;
                pixel1.color = "#804000"; // Changes colour to look like it is carrying something
            },
            elem2: null
        };
        elements.ant.reactions["water"] = {
            func: (pixel1, pixel2) => {
                pixel1.carryingFood = true;
                pixel1.color = "#804000";
            },
            elem2: null
        };
        elements.ant.reactions["sugar_water"] = {
            func: (pixel1, pixel2) => {
                pixel1.carryingFood = true;
                pixel1.color = "#804000";
            },
            elem2: null
        };

        // When a hilled or digging ant hits dirt, it drops off the food bite if it is carrying one
        elements.ant.reactions["dirt"] = {
            func: (pixel1, pixel2) => {
                if (pixel1.carryingFood) {
                    delete pixel1.carryingFood;
                    delete pixel1.color; // Reverts back to vanilla ant colour automatically
                    pixel2.element = "food_bite"; // Directly converts dirt pixel to a food bite
                }
            }
        };
    }

    // 2. Food Bite Element
    elements.food_bite = {
        name: "Food Bite",
        color: "#a0e060",
        behavior: [
            "XX|XX|XX",
            "XX|XX|XX",
            "M2|M1|M2"
        ],
        category: "life",
        hidden: true,
        state: "solid",
        density: 1200,
        reactions: {
            "ant": { "elem1": null, "elem2": "ant" }
        }
    };

    // 3. Queen Ant Element 👑
    elements.queen_ant = {
        name: "Queen Ant",
        alias: ["queen", "queen ant", "queen_ant"],
        color: ["#4a1f00", "#301400"],
        behavior: [
            "XX|CR:egg%1|XX",
            "M2|XX|M2",
            "M1|M1|M1"
        ],
        category: "life",
        state: "solid",
        density: 1800,
        reactions: {
            "food": { "elem1": "queen_ant", "elem2": null },
            "food_bite": { "elem1": "queen_ant", "elem2": null },
            "juice": { "elem1": "queen_ant", "elem2": null },
            "sugar": { "elem1": "queen_ant", "elem2": null }
        }
    };
}

if (typeof runAfterLoad === "function") {
    runAfterLoad(initMyAntMod);
} else {
    initMyAntMod();
}
