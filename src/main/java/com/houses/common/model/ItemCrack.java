package com.houses.common.model;

import java.math.BigDecimal;

import com.houses.common.BaseDao;
import com.houses.service.impl.ICreatePDFServiceImpl;

import lombok.Data;

/**
 * @Author:panshuang
 * @Data:2019/6/9 23:19
 * @Description:
 */
public class ItemCrack extends BaseDao {

    private Integer id;

    private Integer itemId;

    private Double maxLength;

    private Double maxWidth;

    public double getMaxWidth() {
        return maxWidth;
    }

    public void setMaxWidth(double maxWidth) {
        this.maxWidth = maxWidth;
    }

    private String exampleImage;

    private String crackDirection;

    public String getCrackDirection() {
        return crackDirection;
    }

    public void setCrackDirection(String crackDirection) {
        this.crackDirection = crackDirection;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getItemId() {
        return itemId;
    }

    public void setItemId(Integer itemId) {
        this.itemId = itemId;
    }

    public double getMaxLength() {
        return maxLength;
    }

    public void setMaxLength(double maxLength) {
        this.maxLength = maxLength;
    }

    public String getExampleImage() {
        return exampleImage;
    }

    public void setExampleImage(String exampleImage) {
        this.exampleImage = exampleImage;
    }
    @Override
	public String toString() {
		StringBuffer sb = new StringBuffer();
//		if( "0".equals(String.valueOf(crackType)) && wallDamage != null ) {
//			switch(String.valueOf(wallDamage)) {
//			case "0":
//				sb.append("装饰面层出现龟裂");break;
//			case "1":
//				sb.append("装饰面层出现空鼓");break;
//			}
//		}
//		if("1".equals(String.valueOf(crackType)) && crackDirection != null) {
//			sb.append("构件存在裂缝");
//		}
		
		if(ICreatePDFServiceImpl.crackNumCount == 1) {
			return null;
		}
		
		switch(ICreatePDFServiceImpl.crackNum++) {
		case 1:
			sb.append("一");break;
		case 2:
			sb.append("二");break;
		case 3:
			sb.append("三");break;
		default:
			break;
		}
		
		
		sb.append("号裂缝测点");
//		if(crackDirection != null) {
//			switch(crackDirection) {
//			case "0":
//				sb.append("，裂缝方向斜向");break;
//			case "1":
//				sb.append("，裂缝方向竖直");break;
//			case "2":
//				sb.append("，裂缝方向水平");break;
//			case "3":
//				sb.append("，裂缝方向不规则");break;
//			default:
//				break;
//			}
//		}
		if(maxLength != null && Math.abs(maxLength-0.0) > 0.0001) {
			sb.append("长度为" + new BigDecimal(String.valueOf(maxLength)).stripTrailingZeros().toPlainString() + "mm");
		}
		
		if(maxLength != null && Math.abs(maxLength-0.0) > 0.0001 && maxWidth != null && Math.abs(maxWidth-0.0) > 0.0001) {
			sb.append(",");
		}
		
		if(maxWidth != null && Math.abs(maxWidth-0.0) > 0.0001) {
			sb.append("宽度为" + new BigDecimal(String.valueOf(maxWidth)).stripTrailingZeros().toPlainString() + "mm");
		}
		
		sb.append("（图" + ICreatePDFServiceImpl.textNum++ + "）。");
		return sb.toString();
	}
}
