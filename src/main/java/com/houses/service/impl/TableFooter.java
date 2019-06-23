package com.houses.service.impl;

import com.itextpdf.text.BaseColor;
import com.itextpdf.text.Document;
import com.itextpdf.text.DocumentException;
import com.itextpdf.text.Element;
import com.itextpdf.text.ExceptionConverter;
import com.itextpdf.text.Font;
import com.itextpdf.text.Image;
import com.itextpdf.text.Phrase;
import com.itextpdf.text.Rectangle;
import com.itextpdf.text.pdf.ColumnText;
import com.itextpdf.text.pdf.PdfPCell;
import com.itextpdf.text.pdf.PdfPTable;
import com.itextpdf.text.pdf.PdfPageEventHelper;
import com.itextpdf.text.pdf.PdfTemplate;
import com.itextpdf.text.pdf.PdfWriter;
 
public class TableFooter extends PdfPageEventHelper{
 
	
//	String header;
	PdfTemplate total;
	Font font;
 
//	public void setHeader(String header) {
//		this.header = header;
//	}
	
	public void setFont(Font font) {
		this.font = font;
	}
 
	public void onOpenDocument(PdfWriter writer, Document document) {
		total = writer.getDirectContent().createTemplate(40, 16);
	}
 
	public void onEndPage(PdfWriter writer, Document document) {
		PdfPTable table = new PdfPTable(2);
		try {
			
			ColumnText.showTextAligned(writer.getDirectContent(), Element.HEADER, new Phrase("江苏房城建设工程质量检测有限公司", font), document.left() + 110, document.top() + 10, 0);
			
			table.setWidths(new int[] { 25,25 });
			table.setTotalWidth(505);
			table.setLockedWidth(true);
			table.getDefaultCell().setFixedHeight(20);
			table.getDefaultCell().setBorder(Rectangle.TOP);
			table.getDefaultCell().setBorderWidth(2);
			table.getDefaultCell().setBorderColor(BaseColor.BLACK);
			table.getDefaultCell().setHorizontalAlignment(Element.ALIGN_RIGHT);
			table.addCell(new Phrase("第"+String.format("%d", writer.getPageNumber())+"页", font));
			PdfPCell cell = new PdfPCell(Image.getInstance(total));
			cell.setBorder(Rectangle.TOP);
			cell.setBorderWidth(2);
			cell.setBorderColor(BaseColor.BLACK);
			table.addCell(cell);
			table.writeSelectedRows(0, -1, 45, 45, writer.getDirectContent());
 
		} catch (DocumentException de) {
			throw new ExceptionConverter(de);
		}
	}
 
	public void onCloseDocument(PdfWriter writer, Document document) {
		ColumnText.showTextAligned(total, Element.ALIGN_LEFT, new Phrase("共"+String.valueOf(writer.getPageNumber())+"页", font), 0, 2, 0);
	}
}
