package org.FuzzedTest.PaymentForm;//package org.InvalidTest;

import org.openqa.selenium.By;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.Keys;
import org.openqa.selenium.StaleElementReferenceException;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

import java.io.*;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.Hashtable;
import java.util.Random;

public class FuzzingTests {

    public Hashtable<String, String> testCases;
    public int randInt;

    public FuzzingTests() {
        testCases = new Hashtable<>();
        Random rand = new Random();
        randInt = rand.nextInt(100);
    }

    public Hashtable<String, String> getTestCases() {
        return testCases;
    }

    public String firstNameFuzz() throws IOException {
        ProcessBuilder processBuilder = new ProcessBuilder("python", resolvePythonScriptPath("C:\\Users\\zach_\\Documents\\Ascenda\\SeleniumTest\\src\\main\\java\\org\\FuzzedTest\\PaymentForm\\FuzzerGeneratorFirstName.py"));
        processBuilder.redirectErrorStream(true);
        Process process = processBuilder.start();
        InputStream is = process.getInputStream();
        ArrayList<String> fuzzedInputs = readProcessOut(is);
        for(String i: fuzzedInputs){
            System.out.println(i);
        }
        System.out.println(fuzzedInputs.get(randInt));
        return fuzzedInputs.get(randInt);
    }

    public String lastNameFuzz() throws IOException {
        ProcessBuilder processBuilder = new ProcessBuilder("python", resolvePythonScriptPath("C:\\Users\\zach_\\Documents\\Ascenda\\SeleniumTest\\src\\main\\java\\org\\FuzzedTest\\PaymentForm\\FuzzerGeneratorLastName.py"));
        processBuilder.redirectErrorStream(true);
        Process process = processBuilder.start();
        InputStream is = process.getInputStream();
        ArrayList<String> fuzzedInputs = readProcessOut(is);
        for(String i: fuzzedInputs){
            //System.out.println(i);
        }
        System.out.println(fuzzedInputs.get(randInt));
        return fuzzedInputs.get(randInt);
    }

    public String phoneNumberFuzz() throws IOException {
        ProcessBuilder processBuilder = new ProcessBuilder("python", resolvePythonScriptPath("C:\\Users\\zach_\\Documents\\Ascenda\\SeleniumTest\\src\\main\\java\\org\\FuzzedTest\\PaymentForm\\FuzzerGeneratorPhoneNumber.py"));
        processBuilder.redirectErrorStream(true);
        Process process = processBuilder.start();
        InputStream is = process.getInputStream();
        ArrayList<String> fuzzedInputs = readProcessOut(is);
        for(String i: fuzzedInputs){
            //System.out.println(i);
        }
        System.out.println(fuzzedInputs.get(randInt));
        return fuzzedInputs.get(randInt);
    }

    public String emailAddressFuzz() throws IOException {
        ProcessBuilder processBuilder = new ProcessBuilder("python", resolvePythonScriptPath("C:\\Users\\zach_\\Documents\\Ascenda\\SeleniumTest\\src\\main\\java\\org\\FuzzedTest\\PaymentForm\\FuzzerGeneratorEmailAddress.py"));
        processBuilder.redirectErrorStream(true);
        Process process = processBuilder.start();
        InputStream is = process.getInputStream();
        ArrayList<String> fuzzedInputs = readProcessOut(is);
        for(String i: fuzzedInputs){
            //System.out.println(i);
        }
        System.out.println(fuzzedInputs.get(randInt));
        return fuzzedInputs.get(randInt);
    }

    public String creditCardNumberFuzz() throws IOException {
        ProcessBuilder processBuilder = new ProcessBuilder("python", resolvePythonScriptPath("C:\\Users\\zach_\\Documents\\Ascenda\\SeleniumTest\\src\\main\\java\\org\\FuzzedTest\\PaymentForm\\FuzzerGeneratorCreditCardNumber.py"));
        processBuilder.redirectErrorStream(true);
        Process process = processBuilder.start();
        InputStream is = process.getInputStream();
        ArrayList<String> fuzzedInputs = readProcessOut(is);
        for(String i: fuzzedInputs){
            //System.out.println(i);
        }
        System.out.println(fuzzedInputs.get(randInt));
        return fuzzedInputs.get(randInt);
    }

    public String expiryDateFuzz() throws IOException {
        ProcessBuilder processBuilder = new ProcessBuilder("python", resolvePythonScriptPath("C:\\Users\\zach_\\Documents\\Ascenda\\SeleniumTest\\src\\main\\java\\org\\FuzzedTest\\PaymentForm\\FuzzerGeneratorExpiryDate.py"));
        processBuilder.redirectErrorStream(true);
        Process process = processBuilder.start();
        InputStream is = process.getInputStream();
        ArrayList<String> fuzzedInputs = readProcessOut(is);
        for(String i: fuzzedInputs){
            //System.out.println(i);
        }
        System.out.println(fuzzedInputs.get(randInt));
        return fuzzedInputs.get(randInt);
    }

    public String cvcFuzz() throws IOException {
        ProcessBuilder processBuilder = new ProcessBuilder("python", resolvePythonScriptPath("C:\\Users\\zach_\\Documents\\Ascenda\\SeleniumTest\\src\\main\\java\\org\\FuzzedTest\\PaymentForm\\FuzzerGeneratorCVC.py"));
        processBuilder.redirectErrorStream(true);
        Process process = processBuilder.start();
        InputStream is = process.getInputStream();
        ArrayList<String> fuzzedInputs = readProcessOut(is);
        for(String i: fuzzedInputs){
            //System.out.println(i);
        }
        System.out.println(fuzzedInputs.get(randInt));
        return fuzzedInputs.get(randInt);
    }

    public String streetNameFuzz() throws IOException {
        ProcessBuilder processBuilder = new ProcessBuilder("python", resolvePythonScriptPath("C:\\Users\\zach_\\Documents\\Ascenda\\SeleniumTest\\src\\main\\java\\org\\FuzzedTest\\PaymentForm\\FuzzerGeneratorStreetName.py"));
        processBuilder.redirectErrorStream(true);
        Process process = processBuilder.start();
        InputStream is = process.getInputStream();
        ArrayList<String> fuzzedInputs = readProcessOut(is);
        for(String i: fuzzedInputs){
            //System.out.println(i);
        }
        System.out.println(fuzzedInputs.get(randInt));
        return fuzzedInputs.get(randInt);
    }

    public String streetNumberFuzz() throws IOException {
        ProcessBuilder processBuilder = new ProcessBuilder("python", resolvePythonScriptPath("C:\\Users\\zach_\\Documents\\Ascenda\\SeleniumTest\\src\\main\\java\\org\\FuzzedTest\\PaymentForm\\FuzzerGeneratorStreetNumber.py"));
        processBuilder.redirectErrorStream(true);
        Process process = processBuilder.start();
        InputStream is = process.getInputStream();
        ArrayList<String> fuzzedInputs = readProcessOut(is);
        for(String i: fuzzedInputs){
            //System.out.println(i);
        }
        System.out.println(fuzzedInputs.get(randInt));
        return fuzzedInputs.get(randInt);
    }

    public String postalCodeFuzz() throws IOException {
        ProcessBuilder processBuilder = new ProcessBuilder("python", resolvePythonScriptPath("C:\\Users\\zach_\\Documents\\Ascenda\\SeleniumTest\\src\\main\\java\\org\\FuzzedTest\\PaymentForm\\FuzzerGeneratorPostalCode.py"));
        processBuilder.redirectErrorStream(true);
        Process process = processBuilder.start();
        InputStream is = process.getInputStream();
        ArrayList<String> fuzzedInputs = readProcessOut(is);
        for(String i: fuzzedInputs){
            //System.out.println(i);
        }
        System.out.println(fuzzedInputs.get(randInt));
        return fuzzedInputs.get(randInt);
    }

    public String requestsFuzz() throws IOException {
        ProcessBuilder processBuilder = new ProcessBuilder("python", resolvePythonScriptPath("C:\\Users\\zach_\\Documents\\Ascenda\\SeleniumTest\\src\\main\\java\\org\\FuzzedTest\\PaymentForm\\FuzzerGeneratorRequests.py"));
        processBuilder.redirectErrorStream(true);
        Process process = processBuilder.start();
        InputStream is = process.getInputStream();
        ArrayList<String> fuzzedInputs = readProcessOut(is);
        for(String i: fuzzedInputs){
            //System.out.println(i);
        }
        System.out.println(fuzzedInputs.get(randInt));
        return fuzzedInputs.get(randInt);
    }
    
    private static ArrayList<String> readProcessOut(InputStream is) throws IOException {
        ArrayList<String> results = new ArrayList<>();
        InputStreamReader isr =new InputStreamReader(is, StandardCharsets.UTF_8);
        BufferedReader br = new BufferedReader(isr);
        String line;
        while ((line = br.readLine()) != null)
        {
            results.add(line);
        }
        br.close();
        return results;
    }
    private static String resolvePythonScriptPath(String path){
        File file = new File(path);
        return file.getAbsolutePath();
    }

    
}
