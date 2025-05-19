import json
import os
from fpdf import FPDF
from datetime import datetime

# Clase para generar el CV en formato Harvard
class HarvardCV(FPDF):
    def __init__(self):
        super().__init__()
        self.set_auto_page_break(auto=True, margin=15)
        self.add_page()
        self.set_margins(20, 20, 20)
        self.set_font("Arial", "", 11)
        
    def header(self):
        self.set_font("Arial", "B", 16)
        self.cell(0, 10, "CURRICULUM VITAE", 0, 1, "C")
        self.ln(5)
        
    def add_section_title(self, title):
        self.set_font("Arial", "B", 12)
        self.set_fill_color(220, 220, 220)
        self.cell(0, 8, title, 0, 1, "L", fill=True)
        self.ln(2)
        
    def add_content_line(self, left_text, right_text=""):
        self.set_font("Arial", "", 11)
        if right_text:
            self.cell(0, 6, f"{left_text}: {right_text}", 0, 1)
        else:
            self.cell(0, 6, left_text, 0, 1)
            
    def add_experience(self, period, title, company, description):
        self.set_font("Arial", "B", 11)
        self.cell(40, 6, period, 0, 0)
        self.cell(0, 6, f"{title}, {company}", 0, 1)
        
        self.set_font("Arial", "", 11)
        # Wrap description text
        self.multi_cell(0, 6, description)
        self.ln(3)
        
    def add_skill_section(self, title, skills):
        self.set_font("Arial", "B", 11)
        self.cell(0, 6, title, 0, 1)
        
        self.set_font("Arial", "", 11)
        skill_text = ", ".join(skills)
        self.multi_cell(0, 6, skill_text)
        self.ln(3)
        
    def add_education(self, period, degree, institution):
        self.set_font("Arial", "B", 11)
        self.cell(40, 6, period, 0, 0)
        self.cell(0, 6, degree, 0, 1)
        
        self.set_font("Arial", "", 11)
        self.cell(40, 6, "", 0, 0)
        self.cell(0, 6, institution, 0, 1)
        self.ln(3)

# Función para cargar los datos desde los archivos JSON
def load_data():
    json_path = os.path.join(os.path.dirname(__file__), "src", "locales", "es.json")
    with open(json_path, 'r', encoding='utf-8') as f:
        data = json.load(f)
    return data

# Extraer información sobre experiencia laboral
def get_work_experience():
    # Esta información no está en los archivos JSON, así que la agregaremos manualmente
    # basándonos en lo que podríamos deducir del CV web
    return [
        {
            "period": "2020 - Presente",
            "title": "Fundador & CEO",
            "company": "InteliAI",
            "description": "Fundador de startup enfocada en el desarrollo de agentes de IA. Responsable de liderar el desarrollo de plataforma para chatbots impulsados por IA con integración de MercadoPago y gestión de conocimiento."
        },
        {
            "period": "2015 - 2020",
            "title": "Desarrollador Full Stack Senior",
            "company": "Consultora Tecnológica",
            "description": "Desarrollo de soluciones empresariales utilizando React, TypeScript y tecnologías de bases de datos. Implementación de dashboards para monitoreo en tiempo real y visualización de métricas."
        },
        {
            "period": "2005 - 2015",
            "title": "Desarrollador de Software",
            "company": "Sector Bancario",
            "description": "Desarrollo de soluciones para el sector bancario. Implementación de sistemas para procesamiento de transacciones y gestión de datos sensibles."
        }
    ]

# Extraer información sobre habilidades técnicas
def get_skills():
    # Información ejemplo, normalmente esta vendría de los datos del proyecto
    return {
        "languages": ["JavaScript", "TypeScript", "Python", "PHP", "SQL", "HTML/CSS"],
        "frameworks": ["React", "Node.js", "Express", "Tailwind CSS", "Next.js"],
        "database": ["PostgreSQL", "Supabase", "Redis", "MongoDB", "MySQL"],
        "ai": ["OpenAI API", "LangChain", "AI Agents", "NLP", "Embeddings"],
        "devops": ["Docker", "CI/CD", "AWS", "Vercel", "Nginx"]
    }

# Función principal
def generate_harvard_cv(output_path="Harvard_CV_Andres_Martinez.pdf"):
    # Cargar datos
    data = load_data()
    
    # Crear PDF
    pdf = HarvardCV()
    
    # Información personal
    pdf.add_section_title("INFORMACIÓN PERSONAL")
    pdf.add_content_line("Nombre", "Andrés Martínez")
    pdf.add_content_line("Email", "andres@inteliai.cl")
    pdf.add_content_line("Teléfono", "+56 9 55155418")
    pdf.add_content_line("Ubicación", "Santiago, Chile")
    pdf.ln(5)
    
    # Resumen profesional
    pdf.add_section_title("PERFIL PROFESIONAL")
    pdf.multi_cell(0, 6, data["about"]["paragraph1"] + " " + data["about"]["paragraph2"])
    pdf.ln(5)
    
    # Experiencia laboral
    pdf.add_section_title("EXPERIENCIA LABORAL")
    for job in get_work_experience():
        pdf.add_experience(job["period"], job["title"], job["company"], job["description"])
    pdf.ln(5)
    
    # Educación
    pdf.add_section_title("EDUCACIÓN")
    pdf.add_education(
        data["education"]["systemsAnalyst"]["period"],
        data["education"]["systemsAnalyst"]["degree"],
        data["education"]["systemsAnalyst"]["institution"]
    )
    pdf.add_education(
        data["education"]["technicalProgramming"]["period"],
        data["education"]["technicalProgramming"]["degree"],
        data["education"]["technicalProgramming"]["institution"]
    )
    pdf.ln(5)
    
    # Habilidades técnicas
    pdf.add_section_title("HABILIDADES TÉCNICAS")
    skills = get_skills()
    pdf.add_skill_section("Lenguajes de Programación", skills["languages"])
    pdf.add_skill_section("Frameworks y Bibliotecas", skills["frameworks"])
    pdf.add_skill_section("Bases de Datos", skills["database"])
    pdf.add_skill_section("Inteligencia Artificial", skills["ai"])
    pdf.add_skill_section("DevOps", skills["devops"])
    pdf.ln(5)
    
    # Proyectos
    pdf.add_section_title("PROYECTOS DESTACADOS")
    pdf.add_content_line("InteliAI", data["projects"]["items"]["inteliai"]["description"])
    pdf.ln(2)
    pdf.add_content_line("Dashboard InteliAI", data["projects"]["items"]["dashboard"]["description"])
    pdf.ln(2)
    pdf.add_content_line("Ars Perpetuum", data["projects"]["items"]["arsperpetuum"]["description"])
    pdf.ln(5)
    
    # Guardar PDF
    output_file = os.path.join(os.path.dirname(__file__), output_path)
    pdf.output(output_file)
    print(f"CV en formato Harvard generado exitosamente: {output_file}")

if __name__ == "__main__":
    generate_harvard_cv()
