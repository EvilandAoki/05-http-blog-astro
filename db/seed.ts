import { Clients, db } from 'astro:db';

// https://astro.build/db/seed
export default async function seed() {
	// TODO
	await db.insert(Clients).values([
		{
			id: 1,
			name: "Sebastian Rey",
			age: 24,
			isActive: true
		},
		{
			id: 2,
			name: "Sebastian Escobar",
			age: 23,
			isActive: false
		},
		{
			id: 3,
			name: "Alejandro Villamil",
			age: 21,
			isActive: true
		},
		{
			id: 4,
			name: "Freddy Villamil",
			age: 21,
			isActive: true
		}
	])
}
