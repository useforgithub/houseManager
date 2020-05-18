package com.houses.common.model;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import com.houses.common.BaseDao;
import com.houses.common.vo.ItemCrackVo;
import com.houses.dao.IHouseItemDao;
import com.houses.dao.IHouseMainInfoDao;
import com.houses.dao.IItemCrackDao;
import com.houses.service.impl.ICreatePDFServiceImpl;

import lombok.Data;

/**
 * @Author:panshuang
 * @Data:2019/6/9 23:16
 * @Description:
 */
public class HouseItem extends BaseDao {
	
	private Integer id;

    private Integer houseId;
    /**构件序号*/
    private String itemSerial;
    /**构件方向   1--东  2--南  3--西  4--北*/
    private Integer itemDirection;
    /**构件位置   1--墙面  2--天棚  3--地面 */
    private Integer itemLocation;
    /**全景图*/
    private String fullItemExampleImage;
    private String fullItemExampleImage1;
    private String fullItemExampleImage2;
    private String fullItemExampleImage3;
    private String fullItemExampleImage4;
    private String fullItemExampleImage5;
    /**备注*/
    private String comment;
    
    private Integer itemCrackType;

    private Integer itemWallDamage;
    
    private Integer itemLocationVal;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getHouseId() {
        return houseId;
    }

    public void setHouseId(Integer houseId) {
        this.houseId = houseId;
    }

    public String getItemSerial() {
        return itemSerial;
    }

    public void setItemSerial(String itemSerial) {
        this.itemSerial = itemSerial;
    }

    public Integer getItemDirection() {
        return itemDirection;
    }

    public void setItemDirection(Integer itemDirection) {
        this.itemDirection = itemDirection;
    }

    public Integer getItemLocation() {
        return itemLocation;
    }

    public void setItemLocation(Integer itemLocation) {
        this.itemLocation = itemLocation;
    }

    public String getFullItemExampleImage() {
        return fullItemExampleImage;
    }

    public void setFullItemExampleImage(String fullItemExampleImage) {
        this.fullItemExampleImage = fullItemExampleImage;
    }
    
    public String getFullItemExampleImage1() {
        return fullItemExampleImage1;
    }

    public void setFullItemExampleImage1(String fullItemExampleImage1) {
        this.fullItemExampleImage1 = fullItemExampleImage1;
    }
    
    public String getFullItemExampleImage2() {
        return fullItemExampleImage2;
    }

    public void setFullItemExampleImage2(String fullItemExampleImage2) {
        this.fullItemExampleImage2 = fullItemExampleImage2;
    }
    
    public String getFullItemExampleImage3() {
        return fullItemExampleImage3;
    }

    public void setFullItemExampleImage3(String fullItemExampleImage3) {
        this.fullItemExampleImage3 = fullItemExampleImage3;
    }
    
    public String getFullItemExampleImage4() {
        return fullItemExampleImage4;
    }

    public void setFullItemExampleImage4(String fullItemExampleImage4) {
        this.fullItemExampleImage4 = fullItemExampleImage4;
    }
    
    public String getFullItemExampleImage5() {
        return fullItemExampleImage5;
    }

    public void setFullItemExampleImage5(String fullItemExampleImage5) {
        this.fullItemExampleImage5 = fullItemExampleImage5;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }
    
    public Integer getItemCrackType() {
        return itemCrackType;
    }

    public void setItemCrackType(Integer itemCrackType) {
        this.itemCrackType = itemCrackType;
    }
    
    public Integer getItemWallDamage() {
        return itemWallDamage;
    }

    public void setItemWallDamage(Integer itemWallDamage) {
        this.itemWallDamage = itemWallDamage;
    }
    
    @Override
	public String toString() {
    	
    	if(comment.length() != 0) {
    		StringBuffer sb = new StringBuffer(comment + "（图"+ ICreatePDFServiceImpl.textNum++ +"）。") ;
    		return sb.toString();
    	}
    	
    	StringBuffer sb = new StringBuffer();
    	
    	/*
//    	 *   private String itemSerial;
//    /**构件方向   1--东  2--南  3--西  4--北*/
//    private Integer itemDirection;
//    /**构件位置   1--墙面  2--天棚  3--地面 */
//    private String itemLocation;
//    	 */
    	
    	sb.append(itemSerial);
    	
    	if(itemLocation != null && itemLocationVal == 0) {
    		switch (itemLocationVal) {
    		case 0:
    			sb.append("墙面");break;
    		case 1:
    			sb.append("天棚");break;
    		case 2:
    			sb.append("地面");break;
    		}
    	}
    	
    	if(itemDirection != null && itemLocationVal == 0) {
    		switch (itemDirection) {
    		case 0:
    			sb.append("东侧");break;
    		case 1:
    			sb.append("南侧");break;
    		case 2:
    			sb.append("西侧");break;
    		case 3:
    			sb.append("北侧");break;
    		}
    	}
    	
    	if(itemCrackType != null && itemCrackType == 0) {
    		switch (itemCrackType) {
    		case 0:
    			sb.append("粉刷层");break;
    		case 1:
    			sb.append("构件");break;
    		}
    	}
    	
    	if(itemWallDamage != null && itemWallDamage == 0) {
    		switch (itemWallDamage) {
    		case 0:
    			sb.append("存在龟裂现象");break;
    		case 1:
    			sb.append("存在空鼓现象");break;
    		}
    	}
    	
		sb.append("，具体详见影像资料，取其中代表性"+ "sjiling" +"道进行观测：");
		return sb.toString();
	}
    
public String toString(IItemCrackDao iItemCrackDao) {
	
		StringBuffer sb = new StringBuffer();
	
		Integer crackNumCount = iItemCrackDao.queryCrackCountByItemId(id);
		
		
		
		String itemLocationText = null;
		if(itemLocation != null) {
			switch (itemLocation) {
			case 0:
				itemLocationText = "墙面";break;
			case 1:
				itemLocationText = "天棚";break;
			case 2:
				itemLocationText = "地面";break;
			}
		}
		
		String itemDirectionText = null;
		if(itemDirection != null && itemLocation == 0) {
			switch (itemDirection) {
			case 0:
				itemDirectionText = "东侧";break;
			case 1:
				itemDirectionText = "南侧";break;
			case 2:
				itemDirectionText = "西侧";break;
			case 3:
				itemDirectionText = "北侧";break;
			}
		}
		
		String itemCrackTypeText = null;
		if(itemCrackType != null) {
			switch (itemCrackType) {
			case 0:
				itemCrackTypeText = "粉刷层";break;
			case 1:
				itemCrackTypeText = "构件";break;
			}
		}
		
		String itemWallDamageText = null;
		if(itemWallDamage != null) {
			switch (itemWallDamage) {
			case 0:
				itemWallDamageText = "龟裂";break;
			case 1:
				itemWallDamageText = "空鼓";break;
			}
		}
	
    	if(comment.length() != 0) {
//    		sb = new StringBuffer(ICreatePDFServiceImpl.wallNum++ + "、" + comment + "（图"+ ICreatePDFServiceImpl.textNum++ +"）。") ;
    		sb = new StringBuffer(ICreatePDFServiceImpl.wallNum++ + "、" + comment + "（见下图）。") ;
//    		ICreatePDFServiceImpl.textNum++;
    		return sb.toString();
    	}
		
    	if(crackNumCount == 1) {
    		if(itemLocation == 0 && itemCrackType == 0) {
    			List<ItemCrackVo> ItemCrackVo = iItemCrackDao.queryCrackListById(id);
    			Double crackWidth = ItemCrackVo.get(0).getMaxWidth();
    			sb = new StringBuffer(ICreatePDFServiceImpl.wallNum++ + "、" + itemSerial + itemLocationText + itemDirectionText + itemCrackTypeText + "裂缝一道,裂缝测点宽度为" + crackWidth + "mm（图" + ICreatePDFServiceImpl.textNum++ + "）。") ;
    			return sb.toString();
    		}else if(itemLocation == 0 && itemCrackType == 1) {
    			List<ItemCrackVo> ItemCrackVo = iItemCrackDao.queryCrackListById(id);
    			Double crackWidth = ItemCrackVo.get(0).getMaxWidth();
    			Double crackLength = ItemCrackVo.get(0).getMaxLength();
    			sb = new StringBuffer(ICreatePDFServiceImpl.wallNum++ + "、" + itemSerial + itemLocationText + itemDirectionText + itemCrackTypeText + "裂缝一道,裂缝测点宽度为" + crackWidth + "mm,长度为"+crackLength+ "mm（图" + ICreatePDFServiceImpl.textNum++ + "）。") ;
    			return sb.toString();
    		}else if(itemLocation != 0 && itemCrackType == 0) {
    			List<ItemCrackVo> ItemCrackVo = iItemCrackDao.queryCrackListById(id);
    			Double crackWidth = ItemCrackVo.get(0).getMaxWidth();
    			sb = new StringBuffer(ICreatePDFServiceImpl.wallNum++ + "、" + itemSerial + itemLocationText + itemCrackTypeText + "裂缝一道,裂缝测点宽度为" + crackWidth + "mm（图" + ICreatePDFServiceImpl.textNum++ + "）。") ;
    			return sb.toString();
    		}else if(itemLocation != 0 && itemCrackType == 1) {
    			List<ItemCrackVo> ItemCrackVo = iItemCrackDao.queryCrackListById(id);
    			Double crackWidth = ItemCrackVo.get(0).getMaxWidth();
    			Double crackLength = ItemCrackVo.get(0).getMaxLength();
    			sb = new StringBuffer(ICreatePDFServiceImpl.wallNum++ + "、" + itemSerial + itemLocationText + itemCrackTypeText + "裂缝一道,裂缝测点宽度为" + crackWidth + "mm,长度为"+crackLength+"mm（图" + ICreatePDFServiceImpl.textNum++ + "）。") ;
    			return sb.toString();
    		}else {
    			List<ItemCrackVo> ItemCrackVo = iItemCrackDao.queryCrackListById(id);
    			Double crackWidth = ItemCrackVo.get(0).getMaxWidth();
    			sb = new StringBuffer(ICreatePDFServiceImpl.wallNum++ + "、" + itemSerial + itemLocationText + itemCrackTypeText + "裂缝一道,裂缝测点宽度为" + crackWidth + "mm（图" + ICreatePDFServiceImpl.textNum++ + "）。") ;
    			return sb.toString();
    		}
    	}
		
    	
//		sb = new StringBuffer(ICreatePDFServiceImpl.wallNum++ + "、" + itemSerial + itemLocationText + itemDirectionText + itemCrackTypeText + "存在" + itemWallDamageText+ "现象，具体详见影像资料，取其中代表性"+ crackNumCount +"道进行观测：") ;
//		return sb.toString();
		sb.append(ICreatePDFServiceImpl.wallNum++ + "、");
    	sb.append(itemSerial);
    	
    	if(itemLocation != null) {
    		switch (itemLocation) {
    		case 0:
    			sb.append("墙面");break;
    		case 1:
    			sb.append("天棚");break;
    		case 2:
    			sb.append("地面");break;
    		}
    	}
    	
    	if(itemDirection != null) {
    		switch (itemDirection) {
    		case 0:
    			sb.append("东侧");break;
    		case 1:
    			sb.append("南侧");break;
    		case 2:
    			sb.append("西侧");break;
    		case 3:
    			sb.append("北侧");break;
    		}
    	}
    	
    	if(itemCrackType != null && itemCrackType == 0) {
    		switch (itemCrackType) {
    		case 0:
    			sb.append("粉刷层");break;
    		case 1:
    			sb.append("构件");break;
    		}
    	}
    	
    	if(itemWallDamage != null && itemWallDamage == 0) {
    		switch (itemWallDamage) {
    		case 0:
    			sb.append("存在龟裂现象");break;
    		case 1:
    			sb.append("存在空鼓现象");break;
    		}
    	}
    	
		sb.append(",具体详见影像资料,取其中代表性"+ crackNumCount +"道进行观测：");
		return sb.toString();
	}
}
