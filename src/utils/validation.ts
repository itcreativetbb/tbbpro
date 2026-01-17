export const validateMessageContent = (content: string): boolean => {
    if (typeof content !== "string") return false;
    if (content.length > 10000) return false;
    if (content.trim().length === 0) return false;
    return true;
};
