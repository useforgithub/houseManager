package com.houses.controller;

import com.houses.common.dto.PageDto;
import com.houses.common.dto.ResultDto;
import com.houses.common.model.HouseMainInfo;
import com.houses.common.model.User;
import com.houses.common.vo.HouseMainInfoVo;
import com.houses.service.ICreatePDFService;
import com.houses.service.IHouseService;
import com.houses.user.UserService;
import com.itextpdf.text.BadElementException;
import com.itextpdf.text.Image;

import net.coobird.thumbnailator.Thumbnails;

import org.apache.batik.transcoder.TranscoderException;
import org.apache.batik.transcoder.TranscoderInput;
import org.apache.batik.transcoder.TranscoderOutput;
import org.apache.batik.transcoder.image.PNGTranscoder;
import org.apache.commons.io.FileUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.ModelAndView;
import sun.misc.BASE64Decoder;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import java.io.*;
import java.net.MalformedURLException;
import java.net.URLEncoder;
import java.util.ArrayList;
import java.util.List;

/**
 * @Author:panshuang
 * @Data:2019/6/9 12:57
 * @Description:
 */
@Controller
@RequestMapping(value = "/houses")
public class HouseController {

    private static final String TEMP_PATH = System.getProperty("java.io.tmpdir");

    private static final String IMAGE_SUFFIX = "image.jpg";

    private static final String PNG_SUFFIX = "signature.png";

    private static final Logger logger = LoggerFactory.getLogger(HouseController.class);
    
    @Value("${house.config.upload}")
    private String UPLOAD_PATH;

    @Autowired
    IHouseService iHouseService;

    @Autowired
    ICreatePDFService iCreatePDFService;
    
    @Autowired
    UserService userService;
    
    @RequestMapping(value = "/")
    public String getIndex() {
        return "userHome.html";
    }
    
    @RequestMapping(value = "/home")
    public String getHome() {
        return "home.html";
    }
    
    @RequestMapping(value = "/addHouse")
    public String getHouseInfo() {
        return "houseInfo/addHouseInfo.html";
    }
    
    @GetMapping(value = "/login")
    public String getLogin(HttpServletRequest request) {
    	
    	Object user = request.getSession().getAttribute("user");
    	
        if (user == null) {
            return "login.html";
        }
        return "home.html";
    }
    
    @PostMapping(value = "/login")
    public String loginPost(Model model,
                            @ModelAttribute(value = "user") User user,
                            HttpServletResponse response,
                            HttpSession session) {
        String result = userService.login(user);
        if (result.equals("登陆成功")) {
           //session是作为用户登录信息保存的存在
            session.setAttribute("user",user);
            session.setAttribute("username",user.getUser());
            model.addAttribute("result", result);
            if (user.getUser().equals("superadmin")) {
            	return "/home.html";
            } else {
            	return "/userHome.html";
            }
        } else {
        	return "/login.html";
        }
    }

    @GetMapping(value = "/logout")
    public void logout(HttpSession session) {
        //从session中删除user属性，用户退出登录
        session.removeAttribute("user");
    }
    
    @GetMapping(value = "/register")
    public String getRegister() {
        return "register.html";
    }
    
    @PostMapping(value = "/register")
    @ResponseBody
    public int registerPost(@RequestBody User user, HttpServletRequest request) {

    	if(request.getSession().getAttribute("username").toString().equals("superadmin")) {
        	int result = userService.register(user);

            return result;
    	} else {
    		System.out.println(request.getSession().getAttribute("username").toString()+"用户无注册权限");
    		return 2;
    	}

    }
    
    @GetMapping(value = "/changePass")
    public String getChangePass() {
        return "changePass.html";
    }
    
    @PostMapping(value = "/changePass")
    @ResponseBody
    public int changePass(@RequestBody User user) {
    	
    	int result = userService.changePass(user);

        return result;
    }

    @GetMapping(value = "/showUsers")
    public String showUsers() {
        return "showUsers.html";
    }
    
    @RequestMapping(value = "/queryUsers")
    @ResponseBody
    public PageDto<List<User>> queryUsers(User user, HttpServletRequest request) {
        
    	if(request.getSession().getAttribute("username").toString().equals("superadmin")) {
    		PageDto<List<User>> pageDto;
            try {
                pageDto = userService.queryUsers(user);
            } catch (Exception e) {
                logger.error(e.getMessage());
                pageDto = new PageDto<>();
                pageDto.setCount(0);
                pageDto.setData(new ArrayList<>());
            }
            return pageDto;
    	} else {
    		System.out.println(request.getSession().getAttribute("username").toString()+"用户无查看用户权限");
    		return null;
    	}
    	
    	
    }
    
    @PostMapping(value = "/deleteUserById")
    @ResponseBody
    public int deleteUserById(@RequestBody User user, HttpServletRequest request) {
    	
    	if(request.getSession().getAttribute("username").toString().equals("superadmin")) {
        	if(userService.getUserById(user.getId()).equals("superadmin")) {
        		return 3;
        	} else {
        		int result = userService.deleteUserById(user.getId());
                return result;
        	}    
    	} else {
    		System.out.println(request.getSession().getAttribute("username").toString()+"用户无删除权限");
    		return 2;
    	}
    	

    }
    
    @RequestMapping(value = "/showHouses")
    public String showHouses() {
        return "houseInfo/showHouses.html";
    }

    @RequestMapping(value = "/editHouseInfo")
    public String showHouses(Integer houseId, ModelMap modelMap) {
        modelMap.addAttribute("houseId", houseId);
        return "houseInfo/editHouseInfo.html";
    }

    @RequestMapping(value = "/queryHouses")
    @ResponseBody
    public PageDto<List<HouseMainInfoVo>> queryHouses(HouseMainInfoVo houseMainInfoVo) {
        PageDto<List<HouseMainInfoVo>> pageDto;
        try {
            pageDto = iHouseService.queryHouses(houseMainInfoVo);
        } catch (Exception e) {
            logger.error(e.getMessage());
            pageDto = new PageDto<>();
            pageDto.setCount(0);
            pageDto.setData(new ArrayList<>());
        }
        return pageDto;
    }
    
//保存房屋信息
    @RequestMapping(value = "/saveHouseInfo")
    @ResponseBody
    public ResultDto<String> saveHouseInfo(@RequestBody HouseMainInfoVo houseMainInfoVo) {
        ResultDto<String> resultDto;
        try {
            resultDto = iHouseService.saveHouseInfo(houseMainInfoVo);
        } catch (Exception e) {
            logger.error("保存房屋信息异常！");
            e.printStackTrace();
            resultDto = new ResultDto<>(ResultDto.FAIL, "保存房屋信息异常！", null);
        }
        return resultDto;
    }

    @RequestMapping(value = "/updateHouseInfoById")
    @ResponseBody
    public ResultDto<String> updateHouseInfoById(@RequestBody HouseMainInfoVo houseMainInfoVo) {
        ResultDto<String> resultDto;
        try {
            resultDto = iHouseService.updateHouseInfoById(houseMainInfoVo);
        } catch (Exception e) {
            logger.error("更新房屋信息异常！");
            e.printStackTrace();
            resultDto = new ResultDto<>(ResultDto.FAIL, "更新房屋信息异常！", null);
        }
        return resultDto;
    }

    @RequestMapping(value = "/uploadImage")
    @ResponseBody
    public ResultDto<String> uploadImage(MultipartFile file) {
        ResultDto<String> resultDto;
        String imagePath = TEMP_PATH + System.currentTimeMillis() + IMAGE_SUFFIX;
        File dest = new File(imagePath); // 保存位置
        try {
        	Thumbnails.of(file.getInputStream()).width(800).outputQuality(1f).toFile(dest);
//        	Thumbnails.of(file.getInputStream()).size(200, 200).scale(0.25f).outputQuality(1f).toFile(dest);
//        	Thumbnails.of(fromPic).scale(1f).outputQuality(0.25f).toFile(toPic);
//        	FileUtils.copyInputStreamToFile(file.getInputStream(), dest);
            
        } catch (IOException e) {
        	e.printStackTrace();
        	imagePath = "";
        }
        resultDto = new ResultDto<>(ResultDto.SUCCESS, null, imagePath);
        return resultDto;
    }
    
//    @RequestMapping(value="/showImage")
//    @ResponseBody
//    public void showImage(HttpServletRequest request,HttpServletResponse response) throws IOException{
//        String imgFile = request.getParameter("imgFile"); //文件名
//        FileInputStream fileIs=null;
//        try {
//         fileIs = new FileInputStream(UPLOAD_PATH + "/"+imgFile);
//        } catch (Exception e) {
//          logger.error("系统找不到图像文件："+ UPLOAD_PATH + "/"+imgFile);        
//          return;
//        }
//        int i=fileIs.available(); //得到文件大小   
//        byte data[]=new byte[i];   
//        fileIs.read(data);  //读数据   
//        response.setContentType("image/*"); //设置返回的文件类型   
//        OutputStream outStream=response.getOutputStream(); //得到向客户端输出二进制数据的对象   
//        outStream.write(data);  //输出数据      
//        outStream.flush();  
//        outStream.close();   
//        fileIs.close();   
//    }
    
    @RequestMapping(value="/showImage")
    @ResponseBody
    public void showImage(HttpServletRequest request,HttpServletResponse response) throws IOException{
        String imgFile = request.getParameter("imgFile"); //文件名
//        FileInputStream fileIs=null;
        OutputStream outStream=response.getOutputStream();
        try {
//         fileIs = new FileInputStream(imgFile);
         Thumbnails.of(imgFile)
         .size(100, 100)
         .outputFormat("png")
         .toOutputStream(outStream);
        } catch (Exception e) {
          logger.error("系统找不到图像文件："+imgFile);        
          return;
        }
//        int i=fileIs.available(); //得到文件大小   
//        byte data[]=new byte[i];   
//        fileIs.read(data);  //读数据   
//        response.setContentType("image/*"); //设置返回的文件类型   
//        OutputStream outStream=response.getOutputStream(); //得到向客户端输出二进制数据的对象   
//        outStream.write(data);  //输出数据      
        outStream.flush();  
        outStream.close();   
//        fileIs.close();   
    }

    //上传签名图片至临时目录
    @RequestMapping(value = "/saveSign")
    @ResponseBody
    public ResultDto<String> saveSign(String file) {
        ResultDto<String> resultDto;
        String imagePath = UPLOAD_PATH +"/Sign/"+ System.currentTimeMillis() + PNG_SUFFIX;
        try {
            savePic(file, imagePath);
        } catch (Exception e) {
            e.printStackTrace();
            imagePath = "";
        }
        resultDto = new ResultDto<>(ResultDto.SUCCESS, null, imagePath);
        return resultDto;
    }

    public void savePic(String base64, String path) throws IOException, TranscoderException {
        byte[] imageByte;
        BASE64Decoder decoder = new BASE64Decoder();
        imageByte = decoder.decodeBuffer(base64);
        ByteArrayInputStream bis = new ByteArrayInputStream(imageByte);
        TranscoderInput inputSvgImage = new TranscoderInput(bis);
        PNGTranscoder converter = new PNGTranscoder();

        // 文件路径也可以根据自己的需求自定义
        File outputfile = new File(path);

        FileOutputStream pngFileStream = new FileOutputStream(outputfile);

        TranscoderOutput outputPngImage = new TranscoderOutput(pngFileStream);
        converter.transcode(inputSvgImage, outputPngImage);
    }

    @RequestMapping(value = "/deleteHouseInfoByIds")
    @ResponseBody
    public ResultDto<String> deleteHouseInfoByIds(@RequestBody List<Integer> houseIds) {
        ResultDto<String> resultDto;
        try {
            resultDto = iHouseService.deleteHouseInfo(houseIds);
        } catch (Exception e) {
            e.printStackTrace();
            resultDto = new ResultDto<>(ResultDto.FAIL, null, "删除房屋信息失败");
        }
        return resultDto;
    }

    /**
     * 编辑功能，获取房屋信息
     * @param houseMainInfoVo
     * @return
     */
    @RequestMapping(value = "/getHouseInfoByHouseMainInfoVo", method = RequestMethod.POST)
    @ResponseBody
    public ResultDto<HouseMainInfoVo> getHouseInfoByHouseMainInfoVo(HouseMainInfoVo houseMainInfoVo) {
        ResultDto<HouseMainInfoVo> resultDto = new ResultDto<>();
        try {
            resultDto = iHouseService.getHouseInfoByHouseMainInfoVo(houseMainInfoVo);
        } catch (Exception e) {
            logger.error("获取房屋信息异常！");
            e.printStackTrace();
            resultDto.setResultData(ResultDto.FAIL, "获取房屋信息异常！", null);
        }
        return resultDto;
    }

    /**
     * pdf下载
     * @param request
     * @param response
     * @param houseId
     * @throws ServletException
     * @throws IOException
     */
    @RequestMapping(value = "/downLoadPdf")
    public void doGet(HttpServletRequest request, HttpServletResponse response, Integer houseId)
            throws IOException {

        HouseMainInfoVo houseMainInfoVo = new HouseMainInfoVo();
        houseMainInfoVo.setId(houseId);
        ResultDto<HouseMainInfoVo> resultDto = iHouseService.getHouseInfoByHouseMainInfoVo(houseMainInfoVo);
        houseMainInfoVo = resultDto.getData();

        String path = TEMP_PATH + File.separator + System.currentTimeMillis() + ".pdf";//获取文件的相对路径
        iCreatePDFService.showHousePdf(path, houseMainInfoVo);
        //response.setHeader告诉浏览器以什么方式打开
        //假如文件名称是中文则要使用 URLEncoder.encode()编码
        //否则直接使用response.setHeader("content-disposition", "attachment;filename=" + filename);即可
        String pdfFileName = "分户现状调查表_" + houseMainInfoVo.getProjectName() + houseMainInfoVo.getHouseNum() + ".pdf";
        response.setHeader("content-disposition", "attachment;filename=" + URLEncoder.encode(pdfFileName, "UTF-8"));

        InputStream in = null;
        OutputStream out = null;
        try {
            in = new FileInputStream(path); //获取文件的流
            int len = 0;
            byte buf[] = new byte[1024];//缓存作用
            out = response.getOutputStream();//输出流
            while ((len = in.read(buf)) > 0) //切忌这后面不能加 分号 ”;“
            {
                out.write(buf, 0, len);//向客户端输出，实际是把数据存放在response中，然后web服务器再去response中读取
            }
        } finally {
            if (in != null) {
                try {
                    in.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }

            if (out != null) {
                try {
                    out.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        }
    }
}
