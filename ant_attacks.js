// Advanced Ant Colony & Ant Attacks Mod for Sandboxels
// Made by Raiden Corporation

// 1. Setup Standard Ant Reactions & remove solo egg-laying
if (elements.ant) {
    elements.ant.reactions = elements.ant.reactions || {};
    
    // Stop standard ants from laying eggs on their own
    delete elements.ant.reactions["food"];
    delete elements.ant.reactions["sugar"];
    delete elements.ant.reactions["juice"];
    
    // Ants turn termites into dead_bugs
    elements.ant.reactions["termite"] = { "elem1": "ant", "elem2": "dead_bug" };
}

// 2. Food Bite Element (Safe Powder Behavior)
elements.food_bite = {
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

// 3. Carrying Ant Element
elements.carrying_ant = {
    color: "#804000",
    behavior: [
        "XX|XX|XX",
        "XX|XX|XX",
        "M1|M1|M1"
    ],
    category: "life",
    hidden: true,
    state: "solid",
    density: 1500,
    reactions: {
        "dirt": { "elem1": "ant", "elem2": "food_bite" }
    }
};

// 4. Queen Ant Element 👑
elements.queen_ant = {
    color: ["#4a1f00", "#301400"],
    behavior: [
        "XX|CR:egg%1|XX", // 1% chance to lay an egg when fed
        "M2|XX|M2",
        "M1|M1|M1"
    ],
    category: "life",
    state: "solid",
    density: 1800,
    reactions: {
        "food_bite": { "elem1": "queen_ant", "elem2": null },
        "sugar": { "elem1": "queen_ant", "elem2": null }
    }
};
