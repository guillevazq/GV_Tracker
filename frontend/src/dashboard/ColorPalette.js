export const colors = [
    "#dba203",
    "#cfc204",
    "#47d17e",
    "#ad75fc",
    "#e2733c",
];

export const getColor = index => {
    while (index > colors.length - 1) {
        index -= colors.length;
    };

    return colors[index];
};