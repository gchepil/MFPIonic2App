/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.ibm.mfp.sample;

import com.ibm.mfp.security.checks.base.CredentialsValidationSecurityCheck;
import com.ibm.mfp.security.checks.base.CredentialsValidationSecurityCheckConfig;
import java.util.HashMap;
import java.util.Map;
import java.util.Properties;
import java.util.logging.Logger;

/**
 *
 * @author yyavorskyi
 */
public class YevhenSecurityCheck extends CredentialsValidationSecurityCheck {    
    static Logger logger = Logger.getLogger(YevhenSecurityCheck.class.getName());
    static final Map<String, String> USER_DB = new HashMap();    
    static {
        USER_DB.put("greg", "moder");
        USER_DB.put("yevhen", "moder");
        USER_DB.put("micola", "moder1");
    }
    
    /**
     * This method is for MFP - MFP will call this on adapter creation in order
     * to put in the configuration parameters from MFP Console page.
     * Then the created Config object will be parsed to see if any error message are in.
     * After, this config object is preserved somewhere and can be retrieved using the
     * top-level SecurityCheck.getConfiguration() method.
     * @param properties
     * @return 
     */
    @Override
    public YevhenConfig createConfiguration(Properties properties) {
        return new YevhenConfig(properties);
    }
    
    /**
     * This method is for a developer - in order to get the current configuration.
     * @return 
     */
    @Override
    protected YevhenConfig getConfiguration() {
        return (YevhenConfig) super.getConfiguration();
    }
    
    @Override
    protected boolean validateCredentials(Map<String, Object> map) {
        logger.info("HEY HEY - validate: "+map.toString());        
        if (!map.containsKey("login") || !map.containsKey("password"))
            return false;        
        String password = map.get("password").toString().trim();
        if (password.equals(getConfiguration().universalPassword))
            return true;
        else {
            String login = map.get("login").toString().trim();        
            String neededPassword = USER_DB.get(login);        
            boolean result = (neededPassword != null && neededPassword.equals(password));
            logger.info("HEY HEY - result: "+result);        
            return result;        
        }
    }

    @Override
    protected Map<String, Object> createChallenge() {
        Map challengeToDo = new HashMap();
        logger.info("HEY HEY - create challenge");
        challengeToDo.put("message", "Please pass your login/password pair.");
        return challengeToDo;
    }
    
    /**
     * A class for creating my OWN configurations HEHEHE
     */
    public class YevhenConfig extends CredentialsValidationSecurityCheckConfig {
        String universalPassword;        
        
        YevhenConfig(Properties properties) {
            super(properties);            
            universalPassword = super.getStringProperty("YevhensUniversalPassword", properties, "caiwerto8a2m4tmoarvutva8u34").trim();
            if (universalPassword.length() < 10)
                super.addMessage(errors, "YevhensUniversalPassword", "There is a HUUUUGE problem with the length! (at least 10 symbols there should be, padavan)");
        }       
    }    
}
