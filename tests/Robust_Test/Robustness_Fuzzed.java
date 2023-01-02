package org.FuzzedTest;

import org.FuzzedTest.PaymentForm.Payment_Fuzzed_Main;
import org.FuzzedTest.SearchBar.SearchBar_Fuzzed_Main;
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

import static java.lang.Thread.sleep;

public class Robustness_Fuzzed {
    static String uniqueID;
    private static ArrayList<Integer> routeGenerator(Integer count) {
        Random rand = new Random();
        ArrayList<Integer> route = new ArrayList<>();

        // Adds routing options based on weightage: 30% Case 1, 10% Case 2, 20% Case 3, 10% Case 4, 30% Case 5
        for (int i=0; i<count; i++) {
            int temp = rand.nextInt(10) + 1;
            if (temp <= 3) route.add(1);
            else if (temp == 4) route.add(2);
            else if (temp <= 6) route.add(3);
            else if (temp == 7) route.add(4);
            else route.add(5);
        }
        System.out.println("route = " + route);
        return route;
    }

    private static void feature1ValidInput(ChromeDriver driver, Wait<WebDriver> Fwait) throws InterruptedException {
        // Type into Searchbar
        WebElement searchBar = driver.findElement(By.id("searchbar"));

        Random rand = new Random();
        int option = rand.nextInt(4) + 1;

            if (option == 1) {
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
            }

            else if (option == 2) {
                searchBar.sendKeys("F");
                sleep(500);
                searchBar.sendKeys("u");
                sleep(500);
                searchBar.sendKeys("l");

                sleep(1000);
                // Implicit Wait for Search Options to appear
                driver.manage().timeouts().implicitlyWait(Duration.ofSeconds(2));

                // Click Searchbar option
                WebElement searchBarOption = driver.findElement(By.id("The Fullerton Hotel Singapore"));
                searchBarOption.click();
            }

            else if (option == 3) {
                searchBar.sendKeys("O");
                sleep(500);
                searchBar.sendKeys("s");
                sleep(500);
                searchBar.sendKeys("a");

                sleep(1000);
                // Implicit Wait for Search Options to appear
                driver.manage().timeouts().implicitlyWait(Duration.ofSeconds(2));

                // Click Searchbar option
                WebElement searchBarOption = driver.findElement(By.id("Osaka, Japan"));
                searchBarOption.click();
            }

            else {
                searchBar.sendKeys("T");
                sleep(500);
                searchBar.sendKeys("a");
                sleep(500);
                searchBar.sendKeys("m");
                sleep(500);
                searchBar.sendKeys("w");

                sleep(1000);
                // Implicit Wait for Search Options to appear
                driver.manage().timeouts().implicitlyWait(Duration.ofSeconds(2));

                // Click Searchbar option
                WebElement searchBarOption = driver.findElement(By.id("Tamworth, NSW, Australia"));
                searchBarOption.click();
            }

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

        sleep(1000);
        // Click Submit button
        WebElement submit = driver.findElement(By.className("submit-button"));
        submit.click();
        sleep(10000);
    }

    private static void feature2ValidInput(ChromeDriver driver) throws InterruptedException {
        List<WebElement> hotels = driver.findElements(By.className("selectListing"));

        Random rand = new Random();
        WebElement selectedHotel = hotels.get(rand.nextInt(hotels.size()));
        selectedHotel.click();
        sleep(5000);
    }

    private static void feature3ValidInput(ChromeDriver driver) throws InterruptedException {
        List<WebElement> rooms = driver.findElements(By.id("bookRoom"));

        Random rand = new Random();
        WebElement selectedRoom = rooms.get(rand.nextInt(rooms.size()));
        selectedRoom.click();
        sleep(3000);
    }

    private static void feature4ValidInput(ChromeDriver driver) throws InterruptedException {
        WebElement firstName = driver.findElement(By.name("firstName"));
        firstName.click();
        firstName.sendKeys("John");

        WebElement lastName = driver.findElement(By.name("lastName"));
        lastName.click();
        lastName.sendKeys("Doe");

        WebElement phoneNumber = driver.findElement(By.name("phoneNumber"));
        phoneNumber.click();
        phoneNumber.sendKeys("91234567");

        WebElement emailAddress = driver.findElement(By.name("emailAddress"));
        emailAddress.click();
        emailAddress.sendKeys("ascendatest@gmail.com");

        WebElement creditCardNumber = driver.findElement(By.name("creditCardNumber"));
        creditCardNumber.click();
        creditCardNumber.sendKeys("1234567812345678");

        WebElement expiryDate = driver.findElement(By.name("expiryDate"));
        expiryDate.click();
        expiryDate.sendKeys("01012024");

        WebElement cvc = driver.findElement(By.name("cvc"));
        cvc.click();
        cvc.sendKeys("000");

        WebElement streetName = driver.findElement(By.name("streetName"));
        streetName.click();
        streetName.sendKeys("Changi South Avenue 1");

        WebElement streetNumber = driver.findElement(By.name("streetNumber"));
        streetNumber.click();
        streetNumber.sendKeys("59");

        WebElement postalCode = driver.findElement(By.name("postalCode"));
        postalCode.click();
        postalCode.sendKeys("485999");

        WebElement confirmBookingButton = driver.findElement(By.name("confirmBookingButton"));
        sleep(2000);
        confirmBookingButton.click();
        sleep(5000);
    }

    private static void paymentSuccessfulValidInput(ChromeDriver driver) throws InterruptedException {
        uniqueID = driver.findElement(By.className("hidden-unique-id")).getText();
        System.out.println("uniqueID = " + uniqueID);
        WebElement returnHomeButton  = driver.findElement(By.className("return-home-button"));
        returnHomeButton.click();
        System.out.println("Leaving Confirmation Page");
        sleep(5000);
        driver.get("http://localhost:3000/deleteuser");
    }

    private static void deleteUserValidInput(ChromeDriver driver) throws InterruptedException {
        WebElement deleteUser = driver.findElement(By.className("delete-input"));
        deleteUser.click();
        deleteUser.sendKeys(uniqueID);

        WebElement deleteUserButton = driver.findElement(By.className("delete-user-button"));
        sleep(500);
        deleteUserButton.click();
        sleep(3000);
        driver.switchTo().alert().accept();
        sleep(1000);
        driver.get("http://localhost:3000/");
    }

    private static void feature1FuzzedTest(ChromeDriver driver, Wait<WebDriver> Fwait) throws InterruptedException, IOException {
        System.out.println("Running Feature 1 Fuzzing");
        SearchBar_Fuzzed_Main.main(driver, Fwait);
        Thread.sleep(3000);
    }

    private static void feature4FuzzedTest(ChromeDriver driver) throws InterruptedException, IOException {
        System.out.println("Running Feature 4 Fuzzing");
        Payment_Fuzzed_Main.main(driver);
        Thread.sleep(3000);
    }

    // Case 1: Valid input + Button click
    private static void case1(ChromeDriver driver, Wait<WebDriver> Fwait) throws InterruptedException {
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
            feature4ValidInput(driver);
            System.out.println("Leaving Feature 4");
        }

        else if (currentURL.contains("payment_successful")) {
            paymentSuccessfulValidInput(driver);
            System.out.println("Redirecting to user deletion page");
        }

        else if (currentURL.contains("deleteuser")) {
            deleteUserValidInput(driver);
            System.out.println("User Deleted!");
        }
    }

    // 2. Manual Navigation to another page + back button
    private static void case2(ChromeDriver driver) throws InterruptedException {
        System.out.println("Case 2 - Manual Navigation + Back");
        sleep(1000);
        Random rand = new Random();
        int redirectPage = rand.nextInt(10) + 1;

        if (redirectPage == 1) {
            System.out.println("Redirect to homepage");
            driver.get("http://localhost:3000/");
            sleep(5000);
            System.out.println("Back");
            driver.navigate().back();
            sleep(5000);
        }

        else if (redirectPage == 2) {
            System.out.println("Redirect to feature 2");
            driver.get("http://localhost:3000/hotels?");
            sleep(5000);
            System.out.println("Back");
            driver.get("http://localhost:3000/");
            sleep(5000);
        }

        else if (redirectPage == 3) {
            System.out.println("Redirect to feature 3");
            driver.get("http://localhost:3000/hotels/");
            sleep(5000);
            System.out.println("Back");
            driver.get("http://localhost:3000/");
            sleep(5000);
        }

        else if (redirectPage == 4) {
            System.out.println("Redirect to feature 4");
            driver.get("http://localhost:3000/hotels/payment-details");
            sleep(5000);
            System.out.println("Back");
            driver.get("http://localhost:3000/");
            sleep(5000);
        }

        else {
            System.out.println("Redirect external");
            driver.navigate().to("https://www.wikipedia.org/");
            sleep(5000);
            System.out.println("Back");
            driver.navigate().back();
            sleep(5000);
        }
    }

    // 3. Back button
    private static void case3(ChromeDriver driver) throws InterruptedException {
        System.out.println("Case 3 - Back");
        sleep(1000);
        driver.navigate().back();
        sleep(5000);

        if (driver.getCurrentUrl().contains("data")) {
            System.out.println("No previous page, moving back forward");
            driver.navigate().forward();
            sleep(5000);
        }
    }

    // 4. Refresh
    private static void case4(ChromeDriver driver) throws InterruptedException {
        System.out.println("Case 4 - Refresh");
        driver.navigate().refresh();
        Thread.sleep(5000);
    }

    // 5. Invalid Input (Fuzzer Test)
    private static void case5(ChromeDriver driver, Wait<WebDriver> Fwait) throws InterruptedException, IOException {
        System.out.println("Case 5 - Invalid input");
        sleep(1000);
        String currentURL = driver.getCurrentUrl();

        if (currentURL.equals("http://localhost:3000/")) {
           feature1FuzzedTest(driver, Fwait);
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

        else if (currentURL.contains("payment_successful")) {
            paymentSuccessfulValidInput(driver);
            System.out.println("Redirecting to user deletion page");
        }

        else if (currentURL.contains("deleteuser")) {
            deleteUserValidInput(driver);
            System.out.println("User Deleted!");
        }

    }

    public static void main(String[] args) throws InterruptedException, IOException {
        int count = 100;

        if (args.length == 1) {
            count = Integer.parseInt(args[0]);
        }

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
            else if (c == 2) {
                case2(driver);
            }
            else if (c == 3) {
                case3(driver);
            }
            else if (c == 4) {
                case4(driver);
            }
            else if (c == 5) {
                case5(driver, Fwait);
            }
        }
    }
}
