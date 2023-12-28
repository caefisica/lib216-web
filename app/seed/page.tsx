import { Button } from '@/components/ui/button';
import prisma from '../utils/db';

export default function SeedDatabase() {
  async function postData() {
    'use server';

    await prisma.author.createMany({
      data: [
        {
          id: 1,
          name: 'J. J. Sakurai',
          imageString:
            'https://uipxmbnthbibbjfgfvep.supabase.co/storage/v1/object/public/user%20image/sakurai.jpg',
          bio: 'Jun John Sakurai fue un destacado físico teórico y de partículas japonés-estadounidense. Nacido en Tokio, Sakurai se trasladó a Estados Unidos en su adolescencia. Estudió física en Harvard y Cornell, donde desarrolló de manera independiente la teoría V-A de las interacciones débiles. Autor de importantes textos como "Modern Quantum Mechanics", Sakurai fue profesor en la Universidad de Chicago y la Universidad de California, Los Ángeles. Falleció en 1982 durante una visita al CERN.',
        },
        {
          id: 2,
          name: 'James Binney',
          imageString:
            'https://uipxmbnthbibbjfgfvep.supabase.co/storage/v1/object/public/user%20image/binney.jpg',
          bio: 'James Jeffrey Binney es un astrofísico británico y profesor de física en la Universidad de Oxford. Conocido por su trabajo en astrofísica galáctica y extragaláctica teórica, Binney también ha hecho contribuciones significativas en otros campos. Completó su educación en la Universidad de Cambridge y la Universidad de Oxford, y ha recibido numerosos premios, incluyendo la Medalla Isaac Newton en 2023. Es autor de "Galactic Dynamics", un libro importante en su campo.',
        },
        {
          id: 3,
          name: 'Luis de la Peña',
          imageString:
            'https://uipxmbnthbibbjfgfvep.supabase.co/storage/v1/object/public/user%20image/luis.jpg',
          bio: 'Luis Fernando de la Peña Auerbach, nacido en 1927 en Ciudad de México, es un reconocido físico mexicano y profesor en la Universidad Nacional Autónoma de México (UNAM). Especialista en física teórica y mecánica cuántica, de la Peña también se ha destacado como divulgador científico y humanista. Obtuvo su doctorado en la Universidad Estatal de Moscú.',
        },
        {
          id: 4,
          name: 'John S. Townsend',
          imageString:
            'https://uipxmbnthbibbjfgfvep.supabase.co/storage/v1/object/public/user%20image/person.jpg',
          bio: 'John S. Townsend, profesor de física en Harvey Mudd College, es reconocido por su pasión por la enseñanza y por ser autor del libro "Quantum Physics: A Fundamental Approach to Modern Physics". Obtuvo su B.S. de Duke University y su Ph.D. de Johns Hopkins University, y ha sido profesor visitante en varias universidades, incluyendo Caltech y Duke University.',
        },
        {
          id: 5,
          name: 'David J. Griffiths',
          imageString:
            'https://uipxmbnthbibbjfgfvep.supabase.co/storage/v1/object/public/user%20image/griffiths.jpg',
          bio: 'David Jeffrey Griffiths, nacido el 5 de diciembre de 1942, es un físico y educador estadounidense reconocido por su carrera en Reed College, donde fue profesor desde 1978 hasta 2009 y se convirtió en Howard Vollum Professor of Science. Es autor de tres libros de texto de física para estudiantes universitarios ampliamente valorados. Griffiths se graduó de The Putney School y Harvard University (B.A., 1964; M.A., 1966; Ph.D., 1970). Sus trabajos incluyen "Introduction to Elementary Particles", "Introduction to Quantum Mechanics", y "Introduction to Electrodynamics". Recibió el premio Robert A. Millikan en 1997 y fue nombrado Fellow de la American Physical Society en 2009.',
        },
        {
          id: 6,
          name: 'Stephen J. Blundell',
          imageString:
            'https://uipxmbnthbibbjfgfvep.supabase.co/storage/v1/object/public/user%20image/blundell.jpg',
          bio: 'Stephen John Blundell, nacido en 1967, es profesor de física en la Universidad de Oxford y experto en física de la materia condensada. Realizó sus estudios en la Universidad de Cambridge y se especializa en técnicas de rotación de espín de muones y magnetorresistencia. Blundell ha publicado dos libros de texto significativos en el campo de la física y ha sido co-ganador del Premio Daiwa Adrian en 1999 por su trabajo en imanes orgánicos. Además, ha publicado más de 300 artículos de investigación.',
        },
        {
          id: 7,
          name: 'Walter Greiner',
          imageString:
            'https://uipxmbnthbibbjfgfvep.supabase.co/storage/v1/object/public/user%20image/greiner.jpg',
          bio: 'Walter Greiner fue un físico teórico alemán especializado en física atómica, nuclear y de partículas. Profesor en la Universidad de Frankfurt, es reconocido por su serie de libros en física teórica. Greiner obtuvo su maestría y doctorado en física en Alemania y tuvo una destacada carrera académica, incluyendo puestos en la Universidad de Maryland y como co-fundador del Instituto de Estudios Avanzados de Frankfurt. Entre sus estudiantes notables se incluyen Berndt Müller, Johann Rafelski y Horst Stöcker. Falleció en 2016.',
        },
      ],
    });

    await prisma.category.createMany({
      data: [
        { id: 1, name: 'Mecánica Cuántica' },
        { id: 2, name: 'Electromagnetismo' },
        { id: 3, name: 'Termodinámica y Física Estadística' },
        { id: 4, name: 'Mecánica Clásica' },
      ],
    });

    await prisma.donor.createMany({
      data: [
        { id: 1, name: 'Robert Guzman' },
        { id: 2, name: 'Rafael Carlos' },
        { id: 3, name: 'Richard Avalos' },
        { id: 4, name: 'Sergio Cordero' },
      ],
    });

    await prisma.country.createMany({
      data: [
        { id: 1, name: 'Estados Unidos de América' },
        { id: 2, name: 'Reino Unido' },
        { id: 3, name: 'México' },
      ],
    });

    console.log('until here, no problems');

    await prisma.book.createMany({
      data: [
        {
          id: 0,
          title: 'Modern Quantum Mechanics',
          language: 'English',
          isbn: '9780321972071',
          overview:
            "Modern Quantum Mechanics is a classic graduate level textbook, covering the main concepts from quantum mechanics in a clear, organized and engaging manner. The original author, J. J. Sakurai, was a renowned particle theorist. This third edition, revised by Jim Napolitano, introduces topics that extend its value into the twenty-first century, such as modern mathematical techniques for advanced quantum mechanical calculations, while at the same time retaining fundamental topics such as neutron interferometer experiments, Feynman path integrals, correlation measurements, and Bell's inequalities. A solutions manual is available",
          videoSource:
            'https://uipxmbnthbibbjfgfvep.supabase.co/storage/v1/object/public/user%20image/qm.webm',
          youtubeUrl: 'https://www.youtube.com/embed/COWUT4OMHsM',
          categoryId: 1,
          publicationYear: 1985,
          authorId: 1,
          condition: 'good',
          quantity: 1,
          isOriginal: false,
          availability: 'available',
          imageStrings: [
            'https://uipxmbnthbibbjfgfvep.supabase.co/storage/v1/object/public/user%20image/qm_cover.jpg',
          ],
          internalCode: 'CAFQ02.1',
          volume: 1,
          donorId: 1,
          countryId: 1,
          edition: '1ra edición',
        },
        {
          id: 1,
          title: 'The Physics of Quantum Mechanics',
          language: 'English',
          isbn: '9780199688562',
          overview:
            "The Physics of Quantum Mechanics aims to give students a good understanding of how quantum mechanics describes the material world. It shows that the theory follows naturally from the use of probability amplitudes to derive probabilities. It stresses that stationary states are unphysical mathematical abstractions that enable us to solve the theory's governing equation, the time-dependent Schroedinger equation. Every opportunity is taken to illustrate the emergence of the familiarclassical, dynamical world through the quantum interference of stationary states.",
          videoSource: '',
          youtubeUrl: 'https://www.youtube.com/embed/AufmV0P6mA0',
          categoryId: 1,
          publicationYear: 2014,
          authorId: 2,
          condition: 'good',
          quantity: 1,
          isOriginal: false,
          availability: 'available',
          imageStrings: [
            'https://uipxmbnthbibbjfgfvep.supabase.co/storage/v1/object/public/user%20image/binney_cover.jpg',
          ],
          internalCode: 'CAFQ04.1',
          volume: 1,
          donorId: 1,
          countryId: 2,
          edition: '1ra edición',
        },
        {
          id: 2,
          title: 'Introducción a la Mecánica Cuántica',
          language: 'Español',
          isbn: '9786071618795',
          overview:
            'Obra que nos permite el acceso al cuerpo básico de esta parte esencial de la física moderna con base en la experiencia y años de estudio y experimentación científica de su autor Luis de la Peña, científico mexicano de excelencia.',
          videoSource: '',
          youtubeUrl: 'https://www.youtube.com/embed/ytLS8vlJse4',
          categoryId: 1,
          publicationYear: 1991,
          authorId: 3,
          condition: 'good',
          quantity: 1,
          isOriginal: false,
          availability: 'available',
          imageStrings: [
            'https://uipxmbnthbibbjfgfvep.supabase.co/storage/v1/object/public/user%20image/luis_cover.jpg',
          ],
          internalCode: 'CAFQ06.1',
          volume: 1,
          donorId: 2,
          countryId: 3,
          edition: '1ra edición',
        },
        {
          id: 3,
          title: 'A modern Approach to Quantum Mechanics',
          language: 'English',
          isbn: '9781891389139',
          overview:
            "Inspired by Richard Feynman and J.J. Sakurai, A Modern Approach to Quantum Mechanics allows lecturers to expose their undergraduates to Feynman's approach to quantum mechanics while simultaneously giving them a textbook that is well-ordered, logical and pedagogically sound. This book covers all the topics that are typically presented in a standard upper-level course in quantum mechanics, but its teaching approach is new. Rather than organizing his book according to the historical development of the field and jumping into a mathematical discussion of wave mechanics, Townsend begins his book with the quantum mechanics of spin. Thus, the first five chapters of the book succeed in laying out the fundamentals of quantum mechanics with little or no wave mechanics, so the physics is not obscured by mathematics. Starting with spin systems it gives students straightfoward examples of the structure of quantum mechanics. When wave mechanics is introduced later, students should perceive it correctly as only one aspect of quantum mechanics and not the core of the subject.",
          videoSource: '',
          youtubeUrl: 'https://www.youtube.com/embed/HZsP_cuo5mk',
          categoryId: 1,
          publicationYear: 2012,
          authorId: 4,
          condition: 'good',
          quantity: 1,
          isOriginal: false,
          availability: 'available',
          imageStrings: [
            'https://uipxmbnthbibbjfgfvep.supabase.co/storage/v1/object/public/user%20image/townsend_cover.jpg',
          ],
          internalCode: 'CAFQ10.1',
          volume: 1,
          donorId: 3,
          countryId: 1,
          edition: '1ra edición',
        },
        {
          id: 4,
          title: 'Introduction to Electrodynamics',
          language: 'English',
          isbn: '9781009397735',
          overview:
            'The standard textbook on electricity and magnetism for junior/senior undergraduate students in electrodynamics, electricity and magnetism, and electrical engineering. It includes new problems (including several computational problems in Mathematica), worked examples, figures, and updated references to accessible literature',
          videoSource: '',
          youtubeUrl: 'https://www.youtube.com/embed/6NOIqhxvZ74',
          categoryId: 2,
          publicationYear: 2013,
          authorId: 5,
          condition: 'good',
          quantity: 1,
          isOriginal: false,
          availability: 'available',
          imageStrings: [
            'https://uipxmbnthbibbjfgfvep.supabase.co/storage/v1/object/public/user%20image/griffiths_cover.jpg',
          ],
          internalCode: 'CAEL13.1',
          volume: 1,
          donorId: 4,
          countryId: 1,
          edition: '3ra edición',
        },
        {
          id: 5,
          title: 'Concepts in Thermal Physics',
          language: 'English',
          isbn: '9780199562091',
          overview:
            'An understanding of thermal physics is crucial to much of modern physics, chemistry and engineering. This book provides a modern introduction to the main principles that are foundational to thermal physics, thermodynamics and statistical mechanics. The key concepts are carefully presented in a clear way, and new ideas are illustrated with copious worked examples as well as a description of the historical background to their discovery. Applications are presented to subjects as diverse as stellar astrophysics, information and communication theory, condensed matter physics and climate change. Each chapter concludes with detailed exercises. The second edition of this popular textbook maintains the structure and lively style of the first edition but extends its coverage of thermodynamics and statistical mechanics to include several new topics, including osmosis, diffusion problems, Bayes theorem, radiative transfer, the Ising model and Monte Carlo methods. New examples and exercises have been added throughout.',
          videoSource: '',
          youtubeUrl: 'https://www.youtube.com/embed/WUhiIv8LwJk',
          categoryId: 3,
          publicationYear: 2010,
          authorId: 6,
          condition: 'good',
          quantity: 1,
          isOriginal: false,
          availability: 'available',
          imageStrings: [
            'https://uipxmbnthbibbjfgfvep.supabase.co/storage/v1/object/public/user%20image/blundell_cover.jpg',
          ],
          internalCode: 'CATE09.1',
          volume: 1,
          donorId: 3,
          countryId: 2,
          edition: '1ra edición',
        },
        {
          id: 6,
          title: 'Classical Mechanics: Point Particles and Relativity',
          language: 'English',
          isbn: '9780387218519',
          overview:
            'Intended for advanced undergraduates and beginning graduate students, this text is based on the highly successful course given by Walter Greiner at the University of Frankfurt, Germany. The two volumes on classical mechanics provide not only a complete survey of the topic but also an enormous number of worked examples and problems to show students clearly how to apply the abstract principles to realistic problems.',
          videoSource: '',
          youtubeUrl: 'https://www.youtube.com/embed/uncm8DChdhc',
          categoryId: 4,
          publicationYear: 2004,
          authorId: 7,
          condition: 'good',
          quantity: 1,
          isOriginal: false,
          availability: 'available',
          imageStrings: [
            'https://uipxmbnthbibbjfgfvep.supabase.co/storage/v1/object/public/user%20image/greiner_cover.jpg',
          ],
          internalCode: 'CAFC02.1',
          volume: 1,
          countryId: 1,
          edition: '1ra edición',
        },
      ],
    });
  }

  return (
    <div className="m-5">
      <form action={postData}>
        <Button type="submit">Añadir información</Button>
      </form>
    </div>
  );
}
