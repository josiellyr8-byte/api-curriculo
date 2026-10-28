import express, { Request, Response } from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  return res.json({ message: 'API de Currículos ativa e operacional!' });
});

app.get('/profiles', async (req: Request, res: Response) => {
  try {
    const profiles = await prisma.profile.findMany({
      include: {
        academicExperiences: true,
        professionalExperiences: true,
        projects: true,
      },
    });
    return res.json(profiles);
  } catch (error) {
    return res.status(500).json({ error: 'Erro ao buscar currículos.' });
  }
});

app.get('/profiles/:id', async (req: Request, res: Response) => {
  const id = String(req.params.id);
  try {
    const profile = await prisma.profile.findUnique({
      where: { id },
      include: {
        academicExperiences: true,
        professionalExperiences: true,
        projects: true,
      },
    });

    if (!profile) {
      return res.status(404).json({ error: 'Currículo não encontrado.' });
    }

    return res.json(profile);
  } catch (error) {
    return res.status(500).json({ error: 'Erro ao buscar o currículo.' });
  }
});

app.post('/profiles', async (req: Request, res: Response) => {
  const { fullName, title, summary, email, phone, githubUrl, linkedinUrl } = req.body;
  try {
    const newProfile = await prisma.profile.create({
      data: {
        fullName,
        title,
        summary,
        email,
        phone,
        githubUrl,
        linkedinUrl,
      },
    });
    return res.status(201).json(newProfile);
  } catch (error) {
    return res.status(400).json({ error: 'Erro ao criar currículo. Verifique os dados.' });
  }
});

app.put('/profiles/:id', async (req: Request, res: Response) => {
  const id = String(req.params.id);
  const { fullName, title, summary, email, phone, githubUrl, linkedinUrl } = req.body;
  try {
    const updatedProfile = await prisma.profile.update({
      where: { id },
      data: {
        fullName,
        title,
        summary,
        email,
        phone,
        githubUrl,
        linkedinUrl,
      },
    });
    return res.json(updatedProfile);
  } catch (error) {
    return res.status(400).json({ error: 'Erro ao atualizar o currículo.' });
  }
});

app.delete('/profiles/:id', async (req: Request, res: Response) => {
  const id = String(req.params.id);
  try {
    await prisma.profile.delete({
      where: { id },
    });
    return res.status(204).send();
  } catch (error) {
    return res.status(400).json({ error: 'Erro ao apagar o currículo.' });
  }
});

app.put('/academic-experiences/:id', async (req: Request, res: Response) => {
  const id = String(req.params.id);
  const { institution, degree, fieldOfStudy, startDate, endDate, description } = req.body;
  try {
    const updated = await prisma.academicExperience.update({
      where: { id },
      data: { institution, degree, fieldOfStudy, startDate, endDate, description },
    });
    return res.json(updated);
  } catch (error) {
    return res.status(400).json({ error: 'Erro ao atualizar experiência acadêmica.' });
  }
});

app.put('/professional-experiences/:id', async (req: Request, res: Response) => {
  const id = String(req.params.id);
  const { company, position, startDate, endDate, description } = req.body;
  try {
    const updated = await prisma.professionalExperience.update({
      where: { id },
      data: { company, position, startDate, endDate, description },
    });
    return res.json(updated);
  } catch (error) {
    return res.status(400).json({ error: 'Erro ao atualizar experiência profissional.' });
  }
});

app.put('/projects/:id', async (req: Request, res: Response) => {
  const id = String(req.params.id);
  const { title, description, technologies, repoUrl, deployUrl } = req.body;
  try {
    const updated = await prisma.project.update({
      where: { id },
      data: { title, description, technologies, repoUrl, deployUrl },
    });
    return res.json(updated);
  } catch (error) {
    return res.status(400).json({ error: 'Erro ao atualizar o projeto.' });
  }
});

export default app;

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor a correr na porta ${PORT}`);
});