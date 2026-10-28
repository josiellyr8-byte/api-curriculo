import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  await prisma.project.deleteMany();
  await prisma.academicExperience.deleteMany();
  await prisma.professionalExperience.deleteMany();
  await prisma.profile.deleteMany();

  await prisma.profile.create({
    data: {
      fullName: 'Josielly Santos',
      title: 'Desenvolvedora Full Stack & Estudante de Sistemas para Internet',
      summary: 'Desenvolvedora com experiência em JavaScript, Java, HTML, CSS, React, Next.js, SQL, PostgreSQL, Back4App, Git, GitHub e Vercel.',
      email: 'josiellyr8@gmail.com',
      githubUrl: 'https://github.com/josiellyr8-byte',
      academicExperiences: {
        create: [
          {
            institution: 'UNICAP - Universidade Católica de Pernambuco',
            degree: 'Tecnólogo',
            fieldOfStudy: 'Sistemas para Internet',
            startDate: new Date('2024-02-01'),
          },
        ],
      },
      professionalExperiences: {
        create: [
          {
            company: 'Engefrio',
            position: 'Vendedora Corporativo',
            startDate: new Date('06/11/2023'),
            description: 'Atuação na área de televendas B2B, realizando atendimento consultivo a clientes empresariais. Responsável pela prospecção e reativação de clientes, elaboração de orçamentos, negociação comercial, acompanhamento de pedidos e suporte aos clientes via telefone e WhatsApp.',
          },
        ],
      },
      projects: {
        create: [
          {
            title: 'CRM de Clientes',
            description: 'Sistema para gerenciar clientes, tarefas e acompanhar inforamções importantes do atendimento.',
            technologies: ['Next.js', 'BacAppk', 'Parse SDK', 'React.js', 'JavaScript'],
            repoUrl: 'https://crm-clientes-eta.vercel.app/login',
          },
        ],
      },
    },
  });

  await prisma.profile.create({
    data: {
      fullName: 'Lucas Andrade',
      title: 'Engenheiro de Software Frontend',
      summary: 'Especialista em interfaces modernas com React, TypeScript e Tailwind CSS.',
      email: 'lucas.andrade@example.com',
      githubUrl: 'https://github.com/lucas-andrade',
      academicExperiences: {
        create: [
          {
            institution: 'Universidade Federal',
            degree: 'Bacharelado',
            fieldOfStudy: 'Engenharia de Software',
            startDate: new Date('2022-03-01'),
          },
        ],
      },
      professionalExperiences: {
        create: [
          {
            company: 'Web Studio',
            position: 'Desenvolvedor Frontend',
            startDate: new Date('2024-06-01'),
            description: 'Construção de aplicações web responsivas e integração com APIs.',
          },
        ],
      },
      projects: {
        create: [
          {
            title: 'DevDash',
            description: 'Dashboard interativo para métricas de código e repositórios.',
            technologies: ['React', 'TypeScript', 'TailwindCSS'],
            repoUrl: 'https://github.com/lucas-andrade/devdash',
          },
        ],
      },
    },
  });

  console.log('2 currículos cadastrados com sucesso no NeonDB!');
}

main()
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
    process.exit(0);
  });