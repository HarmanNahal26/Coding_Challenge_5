/**
 * Represents an educational resource in the library
 */
export interface Resource {
    id: number;
    title: string;
    type: string;
    url: string;
    description: string;
    createdAt: string;
}

// In-memory storage with sample data to start with
let resources: Resource[] = [
    {
        id: 1,
        title: "Express.js Guide",
        type: "documentation",
        url: "https://expressjs.com/en/guide",
        description: "Official Express.js documentation",
        createdAt: new Date().toISOString(),
    },
    {
        id: 2,
        title: "TypeScript Basics",
        type: "video",
        url: "https://example.com/ts-basics",
        description: "Introduction to TypeScript",
        createdAt: new Date().toISOString(),
    },
    {
        id: 3,
        title: "REST API Design",
        type: "article",
        url: "https://example.com/rest-design",
        description: "Best practices for REST API design",
        createdAt: new Date().toISOString(),
    },
    {
        id: 4,
        title: "Jest Testing Tutorial",
        type: "tutorial",
        url: "https://example.com/jest-tutorial",
        description: "Complete guide to testing with Jest",
        createdAt: new Date().toISOString(),
    },
];

// Counter to generate unique IDs for new resources
let nextId = 5;

/**
 * Returns all resources
 */
export const getAllResources = (): Resource[] => {
    return resources;
};

/**
 * Returns a single resource by ID, or null if not found
 */
export const getResourceById = (id: number): Resource | null => {
    const resource = resources.find((r) => r.id === id);
    return resource || null;
};

/**
 * Creates a new resource and adds it to the collection
 */
export const createResource = (
    data: Omit<Resource, "id" | "createdAt">
): Resource => {
    const newResource: Resource = {
        id: nextId++,
        ...data,
        createdAt: new Date().toISOString(),
    };
    resources.push(newResource);
    return newResource;
};

/**
 * Updates an existing resource by ID
 * Returns the updated resource or null if not found
 */
export const updateResource = (
    id: number,
    data: Partial<Omit<Resource, "id" | "createdAt">>
): Resource | null => {
    const index = resources.findIndex((r) => r.id === id);
    if (index === -1) return null;

    resources[index] = { ...resources[index], ...data };
    return resources[index];
};

/**
 * Deletes a resource by ID
 * Returns true if deleted, false if not found
 */
export const deleteResource = (id: number): boolean => {
    const index = resources.findIndex((r) => r.id === id);
    if (index === -1) return false;

    resources.splice(index, 1);
    return true;
};