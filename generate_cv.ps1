# Script para generar el CV en formato Harvard

# Comprueba si Python está instalado
$pythonCommand = Get-Command python -ErrorAction SilentlyContinue
if (-not $pythonCommand) {
    Write-Host "Python no está instalado. Por favor instala Python 3.6 o superior." -ForegroundColor Red
    exit 1
}

# Comprueba si el entorno virtual existe y lo crea si no existe
if (-not (Test-Path -Path ".\cv_env")) {
    Write-Host "Creando entorno virtual..." -ForegroundColor Yellow
    python -m venv cv_env
}

# Activa el entorno virtual
Write-Host "Activando entorno virtual..." -ForegroundColor Yellow
& .\cv_env\Scripts\Activate.ps1

# Instala dependencias
Write-Host "Instalando dependencias..." -ForegroundColor Yellow
pip install -r requirements_cv.txt

# Ejecuta el script
Write-Host "Generando CV en formato Harvard..." -ForegroundColor Green
python generate_harvard_cv.py

# Comprueba si el archivo se generó correctamente
if (Test-Path -Path .\Harvard_CV_Andres_Martinez.pdf) {
    Write-Host "CV generado exitosamente: Harvard_CV_Andres_Martinez.pdf" -ForegroundColor Green
    
    # Pregunta si desea abrir el archivo
    $open = Read-Host "¿Desea abrir el archivo PDF generado? (s/n)"
    if ($open -eq "s") {
        Invoke-Item .\Harvard_CV_Andres_Martinez.pdf
    }
} else {
    Write-Host "Hubo un problema al generar el CV." -ForegroundColor Red
}

# Desactiva el entorno virtual
deactivate
