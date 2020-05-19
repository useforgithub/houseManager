 package com.houses.common.model;

import lombok.Data;

/**
 * 验证码类
 */
@Data
public class VerifyCode {

    private String code;

    private byte[] imgBytes;

    public String getCode() {
		return code;
	}

	public void setCode(String code) {
		this.code = code;
	}

	public byte[] getImgBytes() {
		return imgBytes;
	}

	public void setImgBytes(byte[] imgBytes) {
		this.imgBytes = imgBytes;
	}

	public long getExpireTime() {
		return expireTime;
	}

	public void setExpireTime(long expireTime) {
		this.expireTime = expireTime;
	}

	private long expireTime;

}

