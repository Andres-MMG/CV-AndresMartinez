#!/usr/bin/env pwsh

# Script para comprobar que la compilación de producción funciona correctamente
Write-Host "Generando compilación de producción para pruebas..." -ForegroundColor Cyan

# Verificar que todas las imágenes necesarias estén en la carpeta public
$imgFiles = @(
    "Andres.png", 
    "torectangulo.png", 
    "logoInteliAi.png", 
    "DashBoardInteliAI.png",
    "arsperpetuum.webp",
    "okfugas.png",
    "dr-house.png",
    "favicon.ico"
)

Write-Host "Verificando imágenes en la carpeta public..." -ForegroundColor Yellow
foreach ($file in $imgFiles) {
    $fullPath = Join-Path -Path ".\public" -ChildPath $file
    if (Test-Path $fullPath) {
        Write-Host "✅ $file encontrado" -ForegroundColor Green
    } else {
        Write-Host "❌ $file NO ENCONTRADO - copiando desde src/components/images" -ForegroundColor Red
        
        # Intentar copiar desde src/components/images si existe
        $srcPath = Join-Path -Path ".\src\components\images" -ChildPath $file
        if (Test-Path $srcPath) {
            Copy-Item -Path $srcPath -Destination $fullPath
            Write-Host "  ↳ Copiado exitosamente" -ForegroundColor Green
        } else {
            Write-Host "  ↳ No se encontró en src/components/images" -ForegroundColor Red
        }
    }
}

# Ejecutar la compilación
Write-Host "`nEjecutando compilación..." -ForegroundColor Cyan
npm run build

# Verificar si la compilación fue exitosa
if ($LASTEXITCODE -eq 0) {
    Write-Host "`n✅ Compilación exitosa" -ForegroundColor Green
    
    # Ejecutar el servidor de vista previa
    Write-Host "`nIniciando servidor de vista previa en http://localhost:4173" -ForegroundColor Cyan
    Write-Host "Presiona Ctrl+C para salir" -ForegroundColor Yellow
    npm run preview
} else {
    Write-Host "`n❌ Error en la compilación" -ForegroundColor Red
}
