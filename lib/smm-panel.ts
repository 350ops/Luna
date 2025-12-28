export const smmClient = {
    addOrder: async (serviceId: number, link: string, quantity: number) => {
        console.log(`[Stub] Adding order: serviceId=${serviceId}, link=${link}, quantity=${quantity}`);
        return Promise.resolve({ order: 12345 });
    }
};
