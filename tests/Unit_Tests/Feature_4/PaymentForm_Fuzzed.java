package org.FuzzedTest;

import org.openqa.selenium.By;
import org.openqa.selenium.Keys;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.FluentWait;
import org.openqa.selenium.support.ui.Wait;
import org.openqa.selenium.support.ui.WebDriverWait;

import java.io.IOException;
import java.time.Duration;
import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Random;
import org.FuzzedTest.PaymentForm.Payment_Fuzzed_Main;

import static java.lang.Thread.sleep;

public class PaymentForm_Fuzzed {
    private static ArrayList<Integer> routeGenerator(Integer count) {
        Random rand = new Random();
        ArrayList<Integer> route = new ArrayList<>();

        for (int i=0; i<count; i++) {
            route.add(1);
        }
        System.out.println("route = " + route);
        return route;
    }

    private static void feature1ValidInput(ChromeDriver driver, Wait<WebDriver> Fwait) throws InterruptedException {
        // Type into Searchbar
        WebElement searchBar = driver.findElement(By.id("searchbar"));


        searchBar.sendKeys("S");
        sleep(500);
        searchBar.sendKeys("i");
        sleep(500);
        searchBar.sendKeys("n");

        sleep(1000);
        // Implicit Wait for Search Options to appear
        driver.manage().timeouts().implicitlyWait(Duration.ofSeconds(2));

        // Click Searchbar option
        WebElement searchBarOption = driver.findElement(By.id("Singapore, Singapore"));
        searchBarOption.click();


        // Click on Start Datepicker
        WebElement startDate = Fwait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath("/html/body/div/div/div/div/div[2]/div/div[1]/div[1]/div/input")));
        startDate.click();
        startDate.sendKeys(Keys.CONTROL+ "a");
        startDate.sendKeys(Keys.DELETE);
        startDate.sendKeys("16/08/2022");

        // Click on End Datepicker
        WebElement endDate = Fwait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath("/html/body/div/div/div/div/div[2]/div/div[2]/div[1]/div/input")));
        endDate.click();
        endDate.sendKeys(Keys.CONTROL+ "a");
        endDate.sendKeys(Keys.DELETE);
        endDate.sendKeys("19/08/2022");

        sleep(500);
        // Click Submit button
        WebElement submit = driver.findElement(By.className("submit-button"));
        submit.click();
        sleep(5000);
    }

    private static void feature2ValidInput(ChromeDriver driver) throws InterruptedException {
        List<WebElement> hotels = driver.findElements(By.className("selectListing"));

        Random rand = new Random();
        WebElement selectedHotel = hotels.get(rand.nextInt(0, hotels.size()));
        selectedHotel.click();
        sleep(5000);
    }

    private static void feature3ValidInput(ChromeDriver driver) throws InterruptedException {
        List<WebElement> rooms = driver.findElements(By.id("bookRoom"));

        Random rand = new Random();
        WebElement selectedRoom = rooms.get(rand.nextInt(0, rooms.size()));
        selectedRoom.click();
        sleep(3000);
    }

    private static void feature4FuzzedTest(ChromeDriver driver) throws InterruptedException, IOException {
        System.out.println("Running Feature 4 Fuzzing");
        Payment_Fuzzed_Main.main(driver);
        Thread.sleep(3000);
    }

    private static void case1(ChromeDriver driver, Wait<WebDriver> Fwait) throws InterruptedException, IOException {
        System.out.println("Case 1 - Valid input");
        sleep(1000);
        String currentURL = driver.getCurrentUrl();

        if (currentURL.equals("http://localhost:3000/")) {
            feature1ValidInput(driver, Fwait);
            System.out.println("Leaving Homepage");
        }

        else if (currentURL.substring(0, 29).equals("http://localhost:3000/hotels?")) {
            feature2ValidInput(driver);
            System.out.println("Leaving Feature 2");
        }

        else if (currentURL.substring(0, 29).equals("http://localhost:3000/hotels/") && !currentURL.contains("payment")) {
            feature3ValidInput(driver);
            System.out.println("Leaving Feature 3");
        }

        else if (currentURL.contains("payment_details")) {
            feature4FuzzedTest(driver);
            System.out.println("Leaving Feature 4");
        }

//        else if (currentURL.contains("payment_successful")) {
//            paymentSuccessfulValidInput(driver);
//            System.out.println("Redirecting to user deletion page");
//        }
//
//        else if (currentURL.contains("deleteuser")) {
//            deleteUserValidInput(driver);
//            System.out.println("User Deleted!");
//        }
    }


    public static void main(String[] args) throws InterruptedException, IOException {
        int count = 100;

        // Generate route
        ArrayList<Integer> route = routeGenerator(count);

        // Path for Chrome
        System.setProperty("webdriver.chrome.driver", "C:\\Users\\zach_\\Documents\\Ascenda\\SeleniumTest\\chromedriver.exe");
        ChromeDriver driver = new ChromeDriver();
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(2));
        driver.get("http:localhost:3000/");

        Wait<WebDriver> Fwait = new FluentWait<WebDriver>(driver)
                .withTimeout(Duration.ofSeconds(2))
                .ignoring(NoSuchElementException.class);

        for (Integer c: route) {
            if (c == 1) {
                case1(driver, Fwait);
            }
        }
    }
}
