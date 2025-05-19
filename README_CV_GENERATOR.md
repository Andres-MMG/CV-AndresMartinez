# Generador de CV en formato Harvard

Este script extrae la información de tu currículum web (desde los archivos JSON de traducción en español) y genera un PDF con formato Harvard.

## Requisitos

- Python 3.6 o superior
- Biblioteca FPDF

## Instalación

1. Instala las dependencias necesarias:

```
pip install -r requirements_cv.txt
```

## Uso

1. Ejecuta el script:

```
python generate_harvard_cv.py
```

2. El archivo PDF se generará en la raíz del proyecto con el nombre `Harvard_CV_Andres_Martinez.pdf`.

## Personalización

Si deseas personalizar más información, puedes editar el script `generate_harvard_cv.py`:

- Para cambiar el estilo, modifica la clase `HarvardCV`
- Para añadir más secciones, modifica la función `generate_harvard_cv`
- Para añadir información que no está en los archivos JSON, modifica las funciones auxiliares como `get_work_experience` y `get_skills`

## Notas

- La información de experiencia laboral es aproximada y debe ser revisada y actualizada con tus datos reales
- Las habilidades técnicas también deben ser revisadas y actualizadas según corresponda
