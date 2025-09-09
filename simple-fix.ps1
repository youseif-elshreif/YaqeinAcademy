# Fix Arabic text encoding issues
$files = Get-ChildItem -Path "src" -Recurse -Include "*.tsx", "*.ts", "*.jsx", "*.js"

foreach ($file in $files) {
    $content = Get-Content $file.FullName -Raw
    
    # Basic replacements for common patterns
    $content = $content -replace "\?\?\?\?\?\?", "غير محدد"
    $content = $content -replace "\?\? \?\?\?\?", "غير محدد"
    $content = $content -replace "\?\?\? \?\?\?\?", "غير محدد"
    $content = $content -replace "\?\?\?\?\?\?\?", "الدروس"
    $content = $content -replace "\?\?\?\?\? \?\?\?\?\?\?", "البيانات الشخصية"
    
    $content | Set-Content $file.FullName -Encoding UTF8
    Write-Host "Fixed: $($file.Name)"
}

Write-Host "Done fixing Arabic text encoding!"
