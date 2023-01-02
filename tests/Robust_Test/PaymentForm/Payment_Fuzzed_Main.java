package org.FuzzedTest.PaymentForm;

import java.io.IOException;
import java.util.Hashtable;

import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;

public class Payment_Fuzzed_Main {

    public static Hashtable<String, String> testCases;
    static String myFirstName = "Johnny";
    static String myLastName = "Depp";
    static String myPhoneNumber = "85871353";
    static String myEmailAddress = "theblackpearl@gmail.com";
    static String myCreditCardNumber = "4586823748574638";
    static String myExpiryDateDay = "09";
    static String myExpiryDateMonth = "12";
    static String myExpiryDateYear = "2022";
    static String myCVC = "123";
    static String myStreetName = "Somapah Road";
    static String myStreetNumber = "2";
    static String myPostalCode = "195288";
    static String myRequests = "This is part of Selenium's web testing";

    public static void main(ChromeDriver driver) throws InterruptedException, IOException {

        FuzzingTests ft = new FuzzingTests();
        Thread.sleep(3000);

        // get the first name field of the form page
		WebElement firstName = driver.findElement(By.name("firstName"));

        // send my first name to fill up the box
        firstName.sendKeys(ft.firstNameFuzz()); 


        // get the last name field of the form page
		WebElement lastName = driver.findElement(By.name("lastName"));

        // send my last name to fill up the box
        lastName.sendKeys(ft.lastNameFuzz()); 
        

        // get the phone number field of the form page
		WebElement phoneNumber = driver.findElement(By.name("phoneNumber"));

        // send my phone number to fill up the box
        phoneNumber.sendKeys(ft.phoneNumberFuzz()); 
        


        // get the email address field of the form page
		WebElement emailAddress = driver.findElement(By.name("emailAddress"));

        // send my email address to fill up the box
        emailAddress.sendKeys(ft.emailAddressFuzz()); 
        


        // get the credit card number field of the form page
		WebElement creditCardNumber = driver.findElement(By.name("creditCardNumber"));

        // send my credit card number to fill up the box
        creditCardNumber.sendKeys(ft.creditCardNumberFuzz()); 
        


        // get the expiry date field of the form page
		WebElement expiryDate = driver.findElement(By.name("expiryDate"));


        // send my expiry date to fill up the box
        expiryDate.click();
        expiryDate.sendKeys(ft.expiryDateFuzz());
        

        // get the cvc field of the form page
		WebElement cvc = driver.findElement(By.name("cvc"));
        // send my cvc to fill up the box
        cvc.sendKeys(ft.cvcFuzz()); 

        
        // get the street name field of the form page
		WebElement streetName = driver.findElement(By.name("streetName"));
        // send my street name to fill up the box
        streetName.sendKeys(ft.streetNameFuzz()); 

        
        // get the street number field of the form page
		WebElement streetNumber = driver.findElement(By.name("streetNumber"));
        // send my street number to fill up the box
        streetNumber.sendKeys(ft.streetNumberFuzz()); 
        

        // get the postal code field of the form page
		WebElement postalCode = driver.findElement(By.name("postalCode"));
        // send my street number to fill up the box
        postalCode.sendKeys(ft.postalCodeFuzz()); 
        


        // get the requests field of the form page
		WebElement requests = driver.findElement(By.name("requests"));
        requests.click();
        // send my requests to fill up the box
        requests.sendKeys(ft.requestsFuzz()); 
        

        //click submit button
		WebElement submitButton = driver.findElement(By.name("confirmBookingButton"));		
		submitButton.click();

        Thread.sleep(3000);
        driver.navigate().back();
        
    }

    public static void getTestCasesFuzzing() throws IOException {
        FuzzingTests ft = new FuzzingTests();
        ft.firstNameFuzz();
        ft.lastNameFuzz();
        ft.phoneNumberFuzz();
        ft.emailAddressFuzz();
        ft.creditCardNumberFuzz();
        ft.expiryDateFuzz();
        ft.cvcFuzz();
        ft.streetNameFuzz();
        ft.streetNumberFuzz();
        ft.postalCodeFuzz();
        ft.requestsFuzz();

    }
}
