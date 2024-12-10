function formatarData(dataStr) {
    const partes = dataStr.split('-');
    const ano = partes[0];
    const mes = parseInt(partes[1], 10);
    const dia = partes[2];

    const meses = [
        'janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho',
        'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'
    ];

    return `${dia} de ${meses[mes - 1]} de ${ano}`;
}

function gerarPDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    let currentY = 20; 

    const dataInput = document.getElementById('data').value;
    const dataFormatada = new Date(dataInput);
    const opcoesFormatacao = { day: 'numeric', month: 'long', year: 'numeric' };
    const dataTexto = `São Paulo, ${dataFormatada.toLocaleDateString('pt-BR', opcoesFormatacao)}`;

    // Arrumar isso daq dps
    doc.setFont('Helvetica', 'normal');
    doc.setFontSize(10); 
    doc.text(dataTexto, pageWidth - 10, currentY, { align: 'right' });
    currentY += 10; 

    doc.setFont('Helvetica', 'bold');
    doc.setFontSize(14); 
    doc.text('SECRETARIA DE SEGURANÇA PÚBLICA DO ESTADO DE SÃO PAULO', pageWidth / 2, currentY, { align: 'center' });
    currentY += 10;
    doc.text('POLÍCIA CIVIL DO ESTADO DE SÃO PAULO', pageWidth / 2, currentY, { align: 'center' });
    currentY += 20;

    const imgWidth = 50;
    const imgHeight = 50;
    doc.addImage(imgData, 'PNG', (pageWidth - imgWidth) / 2, currentY, imgWidth, imgHeight); 
    currentY += 60; 


    const linhaY = currentY; 
    doc.setLineWidth(0.5); 
    doc.setDrawColor(0, 0, 0);
    const margem = 30; 
    doc.line(margem, linhaY, pageWidth - margem, linhaY);
    currentY += 10;

    doc.setFont('Helvetica', 'bold');
    doc.setFontSize(12); 
    doc.text('POLÍCIA CIVIL', pageWidth / 2, currentY, { align: 'center' });
    currentY += 10;

    doc.setFont('Helvetica', 'normal');
    doc.setFontSize(12); 
    doc.text('“Nas situações mais complexas, quando as respostas parecem impossíveis, somos nós que desvendamos o mistério. É essa dedicação que define o verdadeiro espírito da Polícia Civil.”', 10, currentY, { maxWidth: pageWidth - 20 });
    currentY += 20;

    doc.setFont('Helvetica', 'bold');
    doc.setFontSize(12); 
    doc.text('REQUERIMENTO', pageWidth / 2, currentY, { align: 'center' }); 
    currentY += 10;


    doc.setFont('Helvetica', 'normal');
    doc.setFontSize(12); 
    const requerimentoText = 'A Polícia Civil do estado de São Paulo solicita a colaboração do Exército Brasileiro da cidade de Jaguaré - SP para a realização de Transporte e destinação de materiais apreendidos que se encontram sob custódia na delegacia.';
    const requerimentoLines = doc.splitTextToSize(requerimentoText, pageWidth - 20); 
    for (let line of requerimentoLines) {
        if (currentY > pageHeight - 20) { 
            doc.addPage(); 
            currentY = 20; 
        }
        doc.text(line, 10, currentY); 
        currentY += 10; 
    }

const conteudoCarga = document.getElementById('conteudoCarga').value;
if (conteudoCarga) {
    doc.setFont('Helvetica', 'bold'); 
    doc.setFontSize(12); 
    if (currentY > pageHeight - 20) { 
        doc.addPage(); 
        currentY = 20; 
    }
    doc.text('CONTEÚDO DA CARGA:', 10, currentY); 
    currentY += 10; 
    doc.setFont('Helvetica', 'normal'); 
    const conteudoCargaLines = doc.splitTextToSize(conteudoCarga, pageWidth - 20); 
    for (let line of conteudoCargaLines) {
        if (currentY > pageHeight - 20) { 
            doc.addPage(); 
            currentY = 20; 
        }
        doc.text(line, 10, currentY); 
        currentY += 10; 
    }
}

const pesoCarga = document.getElementById('pesoCarga').value;
if (pesoCarga) {
    doc.setFont('Helvetica', 'bold'); 
    doc.setFontSize(12); 
    if (currentY > pageHeight - 20) { 
        doc.addPage(); 
        currentY = 20; 
    }
    doc.text('PESO TOTAL DA CARGA:', 10, currentY); 
    currentY += 10; 
    doc.setFont('Helvetica', 'normal'); 
    doc.text(pesoCarga, 10, currentY); 
    currentY += 10; 
}

// DINHEIRO ILICITO
const solicitacao = document.getElementById('solicitacao').value;
if (solicitacao) {
    if (currentY > pageHeight - 20) {
        doc.addPage();
        currentY = 20;
    }
    doc.setFont('Helvetica', 'bold'); 
    doc.text('QUANTIA DE DINHEIRO ILICITO:', 10, currentY); 
    currentY += 10; 
    doc.setFont('Helvetica', 'normal'); 
    doc.text(solicitacao, 10, currentY); 
    currentY += 10; 
}

    
    const linhaFinalY = currentY + 5; 
    currentY += 5; 
    doc.setLineWidth(0.5); 
    doc.setDrawColor(0, 0, 0); 
    doc.line(margem, linhaFinalY, pageWidth - margem, linhaFinalY); 

    const assinaturaResponsavel = document.getElementById('assinaturaResponsavel').value; 
    if (assinaturaResponsavel) {
        currentY = linhaFinalY - 5; 
        doc.setFont('Courier', 'normal'); 
        doc.setFontSize(12);
        doc.text(assinaturaResponsavel, pageWidth / 2, currentY, { align: 'center' }); 
        currentY += 10; 
    }

    currentY += 5; 
    doc.setFont('Helvetica', 'normal');
    doc.setFontSize(12); 
    doc.text('ASSINATURA DO RESPONSÁVEL', pageWidth / 2, currentY, { align: 'center' }); 


    doc.save('SECRETARIA_DE_SEGURANCA_PUBLICA_DO_ESTADO_DE_SAO_PAULO_PCESP');
}
