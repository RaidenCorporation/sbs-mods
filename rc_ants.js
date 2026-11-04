if (typeof elements === "undefined") {
    elements = {};
}

// Advanced Ant Colony & Ant Attacks Mod for Sandboxels
// Made by Raiden Corporation

function initMyAntMod() {
    // 1. Worker Ants Reactions & Custom Carrying Logic
    if (elements.ant) {
        elements.ant.reactions = elements.ant.reactions || {};
        
        // Setup base reactions
        elements.ant.reactions["food"] = { "elem1": "ant", "elem2": null };
        elements.ant.reactions["sugar"] = { "elem1": "ant", "elem2": null };
        elements.ant.reactions["termite"] = { "elem1": "ant", "elem2": "dead_bug" };

        // Save original ant tick behavior
        var oldAntTick = elements.ant.tick;

        // Custom tick loop to handle carrying behavior seamlessly
        elements.ant.tick = function(pixel) {
            // Run original tick physics (movement, falling, etc.)
            if (oldAntTick) oldAntTick(pixel);

            // Check surrounding pixels for liquids
            var neighbors = [
                pixelMap[pixel.x-1]?.[pixel.y],
                pixelMap[pixel.x+1]?.[pixel.y],
                pixelMap[pixel.x]?.[pixel.y-1],
                pixelMap[pixel.x]?.[pixel.y+1]
            ];

            for (var i = 0; i < neighbors.length; i++) {
                var target = neighbors[i];
                if (!target) continue;

                // Pick up liquids
                if ((target.element === "juice" || target.element === "water" || target.element === "sugar_water") && !pixel.carryingFood) {
                    deletePixel(target.x, target.y); // Consume the liquid pixel
                    pixel.carryingFood = true;
                    pixel.color = "#804000"; // Visual indicator for carrying food
                }

                // Unload food bite into dirt
                if (target.element === "dirt" && pixel.carryingFood) {
                    pixel.carryingFood = false;
                    delete pixel.color; // Revert to standard ant color
                    changePixel(target, "food_bite"); // Transform dirt into food bite
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
