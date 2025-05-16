// app/api/tasks/route.ts
import axios from 'axios';
import { NextRequest, NextResponse } from 'next/server';

// URL de ton backend Spring Boot
const BACKEND_URL = 'http://localhost:8080/api/tasks';

// GET : liste des tâches
export async function GET() {
    try {
        const response = await axios.get(BACKEND_URL);
        return NextResponse.json(response.data);
    } catch (error: any) {
        return NextResponse.json({ error: 'Erreur lors de la récupération des tâches' }, { status: 500 });
    }
}

// POST : création d'une tâche
export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const response = await axios.post(BACKEND_URL, body);
        return NextResponse.json(response.data);
    } catch (error: any) {
        return NextResponse.json({ error: 'Erreur lors de la création' }, { status: 500 });
    }
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
    try {
        const body = await req.json();
        const response = await axios.put(`${BACKEND_URL}/${params.id}`, body);
        return NextResponse.json(response.data);
    } catch (error: any) {
        return NextResponse.json({ error: 'Erreur lors de la modification' }, { status: 500 });
    }
}

export async function DELETE(_: NextRequest, { params }: { params: { id: string } }) {
    try {
        const response = await axios.delete(`${BACKEND_URL}/${params.id}`);
        return NextResponse.json(response.data);
    } catch (error: any) {
        return NextResponse.json({ error: 'Erreur lors de la suppression' }, { status: 500 });
    }
}