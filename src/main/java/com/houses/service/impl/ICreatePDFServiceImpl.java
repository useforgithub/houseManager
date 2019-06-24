package com.houses.service.impl;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Base64;
import java.util.Base64.Decoder;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.alibaba.druid.util.StringUtils;
import com.houses.common.model.HouseMainInfo;
import com.houses.common.model.ItemCrack;
import com.houses.common.vo.HouseItemVo;
import com.houses.common.vo.HouseMainInfoVo;
import com.houses.common.vo.ItemCrackVo;
import com.houses.dao.IHouseMainInfoDao;
import com.houses.dao.IItemCrackDao;
import com.houses.service.ICreatePDFService;
import com.itextpdf.text.BadElementException;
import com.itextpdf.text.BaseColor;
import com.itextpdf.text.Document;
import com.itextpdf.text.Element;
import com.itextpdf.text.Font;
import com.itextpdf.text.Header;
import com.itextpdf.text.Image;
import com.itextpdf.text.PageSize;
import com.itextpdf.text.Paragraph;
import com.itextpdf.text.Phrase;
import com.itextpdf.text.Rectangle;
import com.itextpdf.text.pdf.BaseFont;
import com.itextpdf.text.pdf.ColumnText;
import com.itextpdf.text.pdf.PdfPCell;
import com.itextpdf.text.pdf.PdfPTable;
import com.itextpdf.text.pdf.PdfWriter;

@Service
public class ICreatePDFServiceImpl implements ICreatePDFService {
	
    @Autowired
    IItemCrackDao iItemCrackDao;
	
	public static int textNum = 1;
	public static int imgNum = 1;
	public static int crackNum = 1;
	public static int wallNum = 1;
	public static int crackNumCount = 0;
	public static int currImgNum = 0;
	
	public static PdfPCell getPdfPTableCell(PdfPTable pdfPTable) throws Exception {
		if (pdfPTable == null) {
			throw new Exception("pdfPTable不能为空");
		}
		PdfPCell pdfPCell = new PdfPCell();
		pdfPCell.addElement(pdfPTable);
//		pdfPCell.setBorder(1);
//		pdfPCell.setBorder(Rectangle.NO_BORDER);
//		pdfPCell.setHorizontalAlignment(Element.ALIGN_CENTER);
		return pdfPCell;
	}
	
	public static PdfPTable getPdfPTable(int column, int[] tableWidth) throws Exception {
		PdfPTable table = new PdfPTable(column);
		table.setWidths(tableWidth);
		table.getDefaultCell().setBorder(0);
		table.setWidthPercentage(100);
		return table;
	}
	
	public static PdfPCell setCellAlign(PdfPCell pdfCell) throws Exception {
		pdfCell.setUseAscender(true);
		pdfCell.setUseDescender(true);
		pdfCell.setVerticalAlignment(Element.ALIGN_MIDDLE);
		pdfCell.setHorizontalAlignment(Element.ALIGN_CENTER);//水平居中
		pdfCell.setMinimumHeight(24);
		return pdfCell;
	}
	
	/**
	 * 获取PDF字体
	 * 
	 * @return 小四：12 四号：14
	 * @throws Exception
	 */
	public static Font getFont(float size) {
		BaseFont bfChinese;
		Font font = null;
		try {
			bfChinese = BaseFont.createFont("C:/Windows/Fonts/simfang.ttf",BaseFont.IDENTITY_H,BaseFont.NOT_EMBEDDED);
//			bfChinese = BaseFont.createFont("/opt/apache-tomcat-8.5.42/webapps/ROOT/WEB-INF/classes/static/font/simfang.ttf",BaseFont.IDENTITY_H,BaseFont.NOT_EMBEDDED);
			font = new Font(bfChinese,size);// 正常字体
		} catch (Exception e) {
			e.printStackTrace();
		}
		return font;
	}
	
	/**
	 * 
	 * @param path PDF保存路径
	 * 	 * @param projectName 工程名称
	 * 	 * @param doorNo 门牌号
	 * 	 * @param date 检测日期
	 * 	 * @param name 户主名称
	 */
	@Override
	public void showHousePdf(String path,HouseMainInfoVo houseMainInfoVo) {
		Document document = null;
		PdfWriter writer = null;
		
		textNum = 1;
		imgNum = 1;
		wallNum = 1;
		
		try {
			File file = new File(path);
			
			Font font = getFont(14);
			//左 右 上 下
			document = new Document(PageSize.A4, 90f, 90f, 42.5f, 72f);
			writer = PdfWriter.getInstance(document, new FileOutputStream(file));
			
			//设置页脚
			Font subTitleFont = getFont(12);
			subTitleFont.setColor(BaseColor.GRAY);
			TableFooter footer = new TableFooter();
			footer.setFont(subTitleFont);
			writer.setPageEvent(footer);
			
			document.open();
		
			//设置固定格式
			Paragraph subTitle = new Paragraph("附件1：", font);
			Paragraph theme = new Paragraph("分户现状调查表", font);
			theme.setAlignment(Element.ALIGN_CENTER);
//			theme.setLeading(45f);
			document.add(subTitle);
			document.add(theme);
			
			//占位
			document.add(new Paragraph(" ",getFont(8)));
			
			//创建totalTable
			
			// 第一行
			
			int[] totalTableWidth = { 18,32,14,36 };
			PdfPTable totalTable = getPdfPTable(4, totalTableWidth);
			totalTable.setSplitLate(false);  
			totalTable.setSplitRows(true); 
			
			PdfPCell cell11 = new PdfPCell(new Phrase("工程名称", font));
			PdfPCell cell12 = new PdfPCell(new Phrase(houseMainInfoVo.getProjectName(), font));

			PdfPCell cell13 = new PdfPCell(new Phrase("门牌号", font));
			PdfPCell cell14 = new PdfPCell(new Phrase(houseMainInfoVo.getHouseNum(), font));
			
			PdfPCell cell21 = new PdfPCell(new Phrase("检测日期", font));
			Long timeLong = houseMainInfoVo.getCheckDate();
			Date datetime = new Date(timeLong);
//			SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
			SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
			String formatDate = sdf.format(datetime);
			PdfPCell cell22 = new PdfPCell(new Phrase(formatDate, font));
			
			//占位
			PdfPCell cell23 = new PdfPCell(new Phrase("", font));
			cell23.setColspan(2);
			
			totalTable.addCell(setCellAlign(cell11));
			totalTable.addCell(setCellAlign(cell12));
			totalTable.addCell(setCellAlign(cell13));
			totalTable.addCell(setCellAlign(cell14));
			totalTable.addCell(setCellAlign(cell21));
			totalTable.addCell(setCellAlign(cell22));
			totalTable.addCell(setCellAlign(cell23));
			
			int[] table3Width = {100};
			PdfPTable table3 = getPdfPTable(1,table3Width);
			
			for(HouseItemVo houseItemVo : houseMainInfoVo.getHouseItemVoList()) {

				currImgNum = 0;
				
				List<ItemCrackVo> itemCrackVoList = houseItemVo.getItemCrackVoList();
				
				crackNumCount = iItemCrackDao.queryCrackCountByItemId(houseItemVo.getId());

				//设置文字
				int i = 1;
				PdfPCell houseTextCell = setCreakTextList(itemCrackVoList, houseItemVo.toString(iItemCrackDao),i);
				if(houseTextCell != null) {
					table3.addCell(houseTextCell);
				}
				
				//设置图片
				PdfPCell houseImageCell = setCreakImageList(itemCrackVoList, houseItemVo,i);
//				houseImageCell.setUseAscender(true);
//				houseImageCell.setHorizontalAlignment(Element.ALIGN_CENTER);
//				houseImageCell.setVerticalAlignment(Element.ALIGN_TOP);
				if(houseImageCell != null) {
					table3.addCell(houseImageCell);
				}
				
			}
			
			PdfPCell table3Cell = getPdfPTableCell(table3);
			   
			table3Cell.setColspan(4);
			table3Cell.setPaddingLeft(-50);
			table3Cell.setPaddingRight(-55);
//			table3Cell.setHorizontalAlignment(Element.ALIGN_CENTER);
//			table3Cell.setBackgroundColor(BaseColor.YELLOW);
//			table3Cell.setBorderWidthTop(0);
//			table3Cell.setBorderWidthBottom(0);
//			table3Cell.setBorder(0);
//			table3Cell.setColspan(4);
			totalTable.addCell(table3Cell);		
			
			if(!StringUtils.isEmpty(houseMainInfoVo.getSignPath())) {
				
				int[] table4Width = {60,40};
				PdfPTable table4 = getPdfPTable(2,table4Width);
				Image image;
				try {
					PdfPCell cell42 = new PdfPCell(new Phrase("签名：", getFont(14)));
					cell42.setBorder(Rectangle.NO_BORDER);
					cell42.setHorizontalAlignment(Element.ALIGN_RIGHT);
					table4.addCell(cell42);
					//图片
					image = Image.getInstance(houseMainInfoVo.getSignPath());
					image.scaleAbsolute(150, 60);
					PdfPCell cell41= new PdfPCell(image);
					cell41.setBorder(Rectangle.NO_BORDER);
					cell41.setHorizontalAlignment(Element.ALIGN_LEFT);
					table4.addCell(cell41);
					//图片对应的文字 
				} catch (BadElementException | IOException e) {
					e.printStackTrace();
				}
				PdfPCell table4Cell = getPdfPTableCell(table4);
				table4Cell.setBorder(Rectangle.NO_BORDER);
				
				table4Cell.setColspan(4);
				totalTable.addCell(table4Cell);
				
			}
			
			document.add(totalTable);
			
			document.close();
			writer.close();
		}catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	/**
	 * 设置裂缝项图片
	 * @param imagePath 图片路径
	 * @param text 图片描述
	 * @return
	 * @throws Exception
	 */
	public static PdfPCell setCreakImageList(List<ItemCrackVo> itemCrackVoList,HouseItemVo houseItemVo,int i) throws Exception {
		int[] table1Width = {50,50};
		PdfPTable table1 = getPdfPTable(2,table1Width);
		table1.setTotalWidth(430);
		table1.setLockedWidth(true);
				
		PdfPCell cellInTable = new PdfPCell(new Phrase(""));
		cellInTable.setBorder(Rectangle.NO_BORDER);
		
		if( houseItemVo.getComment().length() != 0) {
			if(houseItemVo.getFullItemExampleImage().length() != 0) {
				PdfPCell fullImageCell = setCreakItem(houseItemVo.getFullItemExampleImage(), "图" + imgNum++);
				if(fullImageCell != null) {
					table1.addCell(fullImageCell);
				}
			}
			
			if(houseItemVo.getFullItemExampleImage1().length() != 0) {
				PdfPCell fullImageCell1 = setCreakItem(houseItemVo.getFullItemExampleImage1(), "图" + imgNum++);
				if(fullImageCell1 != null) {
					table1.addCell(fullImageCell1);
				}
			}
			
			if(houseItemVo.getFullItemExampleImage2().length() != 0) {
				PdfPCell fullImageCell2 = setCreakItem(houseItemVo.getFullItemExampleImage2(), "图" + imgNum++);
				if(fullImageCell2 != null) {
					table1.addCell(fullImageCell2);
				}
			}
			
			if(houseItemVo.getFullItemExampleImage3().length() != 0) {
				PdfPCell fullImageCell3 = setCreakItem(houseItemVo.getFullItemExampleImage3(), "图" + imgNum++);
				if(fullImageCell3 != null) {
					table1.addCell(fullImageCell3);
				}
			}
			
			if(houseItemVo.getFullItemExampleImage4().length() != 0) {
				PdfPCell fullImageCell4 = setCreakItem(houseItemVo.getFullItemExampleImage4(), "图" + imgNum++);
				if(fullImageCell4 != null) {
					table1.addCell(fullImageCell4);
				}
			}
			
			if(houseItemVo.getFullItemExampleImage5().length() != 0) {
				PdfPCell fullImageCell5 = setCreakItem(houseItemVo.getFullItemExampleImage5(), "图" + imgNum++);
				if(fullImageCell5 != null) {
					table1.addCell(fullImageCell5);
				}
			}
			
			
			
			if(currImgNum%2 != 0) {
				table1.addCell(cellInTable);
			}
			
			PdfPCell table1Cell = getPdfPTableCell(table1);
			table1Cell.setBorder(Rectangle.NO_BORDER);
			return table1Cell;
		}
		
		for(ItemCrack itemCrackVo : itemCrackVoList) {
			PdfPCell creakItemCell = setCreakItem(itemCrackVo.getExampleImage(), "图" + imgNum++);
			if(creakItemCell != null) {
				table1.addCell(creakItemCell);
			}
		}
		
		PdfPCell fullImageCell = setCreakItem(houseItemVo.getFullItemExampleImage(), "全景图");
			if(fullImageCell != null) {
				table1.addCell(fullImageCell);
			}
			
		if(currImgNum%2 != 0) {
			table1.addCell(cellInTable);
		}
			
		PdfPCell table1Cell = getPdfPTableCell(table1);
		table1Cell.setBorder(Rectangle.NO_BORDER);
		
		return table1Cell;
	}
	
	/**
	 * 设置图片+文字描述
	 * @param imagePath 图片路径
	 * @param text 图片描述
	 * @return
	 * @throws Exception
	 */
	public static PdfPCell setCreakItem(String imagePath,String text) throws Exception {
		PdfPTable table1 = new PdfPTable(1);
		table1.setSplitLate(false);
		table1.setSplitRows(false);
		Image image;
		try {
			File file = new File(imagePath);
			if(!file.exists()) {
				return null;
			}
			//图片
			image = Image.getInstance(imagePath);
//			image.scaleAbsolute(220, 138);
			PdfPCell cell1= new PdfPCell(image,true);
			cell1.setBorder(Rectangle.NO_BORDER);
			cell1.setVerticalAlignment(Element.ALIGN_MIDDLE);
			cell1.setMinimumHeight(138);
			
//			cell1.setBorder(3);
//			cell1.setBackgroundColor(BaseColor.YELLOW);
			
			table1.addCell(cell1);
			//图片对应的文字 
			PdfPCell cell2 = new PdfPCell(new Phrase(text, getFont(14)));
			cell2.setBorder(Rectangle.NO_BORDER);
			
//			cell2.setBorder(3);
//			cell2.setBackgroundColor(BaseColor.YELLOW);
			
			cell2.setHorizontalAlignment(Element.ALIGN_CENTER);
			
			table1.addCell(cell2);
		} catch (BadElementException | IOException e) {
			e.printStackTrace();
		}
		PdfPCell table1Cell = getPdfPTableCell(table1);
//		table1Cell.setBorder(Rectangle.NO_BORDER);
//		table1Cell.setBorder(3);
//		table1Cell.setBackgroundColor(BaseColor.YELLOW);
		table1Cell.setBorder(Rectangle.NO_BORDER);
		currImgNum++;
		return table1Cell;
	}
	
	/**
	 * 设置裂缝文字
	 * @return
	 * @throws Exception
	 */
	public static PdfPCell setCreakTextList(List<ItemCrackVo> itemCrackVoList,String text,int i) throws Exception {
		PdfPTable table1 = new PdfPTable(1);
		//设置构件项文字
		
		Phrase cell1Text = new Phrase(text, getFont(14));
		cell1Text.setLeading(30);
		
		PdfPCell cell1 = new PdfPCell(cell1Text);
		cell1.setBorder(Rectangle.NO_BORDER);
		cell1.setHorizontalAlignment(Element.ALIGN_LEFT);
		cell1.setPaddingBottom(8);
		table1.addCell(cell1);
		crackNum = 1;
		for(ItemCrack itemCrackVo : itemCrackVoList) {
			
			Phrase cell2Text = new Phrase(itemCrackVo.toString() , getFont(14));
//			cell2Text.setLeading(30);
			
			PdfPCell cell2 = new PdfPCell(cell2Text);
			cell2.setBorder(Rectangle.NO_BORDER);
			cell2.setHorizontalAlignment(Element.ALIGN_LEFT);
			cell2.setPaddingBottom(8);
			table1.addCell(cell2);
		}
		
		PdfPCell table1Cell = getPdfPTableCell(table1);
		table1Cell.setBorder(Rectangle.NO_BORDER);
		return table1Cell;
	}
	
}
