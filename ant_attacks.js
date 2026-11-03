// Advanced Ant Colony & Ant Attacks Mod for Sandboxels
// Made by Raiden Corporation

// 1. Remove automatic egg laying from standard ants (Only Queen can lay)
if (elements.ant) {
    elements.ant.reactions = elements.ant.reactions || {};
    
    // Stop standard ants from laying eggs on their own after eating
    delete elements.ant.reactions["food"];
    delete elements.ant.reactions["sugar"];
    delete elements.ant.reactions["juice"];
    
    // Ants target termites and eggs on the surface to kill/harvest
    elements.ant.reactions["termite"] = { "elem1": "ant", "elem2": "dead_bug" };
}

// 2. Add Carrying Behavior (Ants & Termites drag food/eggs down instead of instant eating)
// When an ant touches food on the surface, it turns into a carrying ant that tunnels down
elements.carrying_ant = {
    color: "#804000",
    behavior: [
        "XX|XX|XX",
        "XX|XX|XX",
        "M1|M1|M1", // Moves downward into dirt/tunnels to bring food inside
    ],
    category: "life",
    hidden: true,
    state: "solid",
    density: 1500,
    reactions: {
        "dirt": { "elem1": "ant", "elem2": "food_bite" }, // Drops off food bites inside colony!
    }
};

// Food bite size for sharing among the colony
elements.food_bite = {
    color: "#a0e060",
    behavior: behaviors.POWDER,
    category: "life",
    hidden: true,
    state: "solid",
    reactions: {
        "ant": { "elem1": null, "elem2": "ant" } // Ants eat small bites inside
    }
};

// 3. New Element: Queen Ant 👑
elements.queen_ant = {
    color: ["#4a1f00", "#301400"],
    behavior: [
        "XX|CR:ant_egg%1|XX", // 1% chance to lay a Queen Ant Egg when fed
        "M2|XX|M2",
        "M1|M1|M1",
    ],
    category: "life",
    state: "solid",
    density: 1800,
    reactions: {
        "food_bite": { "elem1": "queen_ant", "elem2": null }, // Queen feeds on bites brought by workers
        "sugar": { "elem1": "queen_ant", "elem2": null },
    }
};

// Trigger death of entire colony if Queen dies
elements.queen_ant.tick = function(pixel) {
    // Keeps track of the queen's health and life
    if (!pixel.alive) {
        // If Queen dies, signal worker ants
        elements.ant.behavior = [
            "XX|XX|XX",
            "XX|CH:dead_bug|XX", // Workers turn into DeadBug if Queen dies
            "XX|XX|XX"
        ];
    }
};
