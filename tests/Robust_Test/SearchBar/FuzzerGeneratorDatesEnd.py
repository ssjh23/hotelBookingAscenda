"""
fuzz_generator()
1. Take Valid Input String
2. Choose one of the ways to mutate Valid Input'    
    . Flip a bit
    . Trimming
    . Swapping Characters
    . Inserting Characters
3. Grammar for searchbar <State>|", "|<Country>
4. Grammar for DatePicker <Number>|<Separator>|<Number>|<Separator>|<Number>
5. Select Variations of field to form full query data by String concatenation
6. Output
"""

from random import *
from unittest import case

def fuzz_generator_flip_bit(input):
    input_to_bytes = bytearray(input, "utf-8")
    #Select which index in bit_list to flip
    letter_to_flip_index = randint(0, len(input_to_bytes)-1)
    bit_list = []
    #Convert Every Letter to 8 bits
    for letter_in_ASCII in input_to_bytes:
        bit_list.append(letter_in_ASCII)
    #Select which letter to flip
    letter_selected = bit_list[letter_to_flip_index]
    #Select random bit in selected letter
    letter = '{0:07b}'.format(letter_selected)
    bit_to_flip = randint(0, len(letter)-1)
    if bit_to_flip != len(letter)-1:
        if letter[bit_to_flip] == '1':
            new_letter = letter[:bit_to_flip]  + '0' + letter[bit_to_flip+1:]
        else:
            new_letter = letter[:bit_to_flip]  + '1' + letter[bit_to_flip+1:]
    else:
        if letter[bit_to_flip] == '1':
            new_letter = letter[:bit_to_flip]  + '0' 
        else:
            new_letter = letter[:bit_to_flip]  + '1' 

    #Change element in bit list at letter_to_flip_index to the new letter 
    bit_list[letter_to_flip_index] = int(new_letter,2)
    #Decode bytearray back to string to return
    new_string = bytes.decode(bytes(bit_list), "utf-8")
    return new_string 

def fuzz_generator_trimming(input):
    #
    boundary_one = randint(0, len(input))
    boundary_two = randint(0, len(input))
    while(boundary_one == boundary_two):
        boundary_two = randint(0, len(input))
    left_boundary = min(boundary_one,boundary_two)
    right_boundary = max(boundary_one,boundary_two)
    new_string = input[left_boundary:right_boundary]
    return new_string


def fuzz_generator_swapping(input):
    #Generate two random indexes
    letter_one_index = randint(0, len(input)-1)
    letter_two_index = randint(0, len(input)-1)
    while(letter_one_index == letter_two_index):
        letter_two_index = randint(0, len(input)-1)
    #Find lower index and higher index positions in the string
    lower_index = min(letter_one_index,letter_two_index)
    higher_index = max(letter_one_index,letter_two_index)
    letter_one = input[lower_index]
    letter_two = input[higher_index]
    #Swap the two places of the string: Letter one was lower, put at higher position and vice versa
    new_string = input[:lower_index] + letter_two + input[lower_index+1:higher_index] + letter_one + input[higher_index+1:]
    return new_string


def fuzz_generator_inserting(input):
    #Generate random index to insert string
    insertion_index = randint(0, len(input)-1)
    #Generate random element to insert 
    ASCII_value = randint(33,127)
    insert_element = chr(ASCII_value)
    new_string = input[:insertion_index+1] + insert_element + input[insertion_index+1:]
    return new_string
    

def fuzz_generator_main():
    starting_string = "06/08/2022"
    for i in range(100):
        case_to_use = randint(1,4)
        if case_to_use == 1:
            print(fuzz_generator_flip_bit(starting_string))
        elif case_to_use == 2:
            print(fuzz_generator_trimming(starting_string))
        elif case_to_use == 3:
            print(fuzz_generator_swapping(starting_string))
        else:
            print(fuzz_generator_inserting(starting_string))
    return starting_string

if __name__ == '__main__':
    fuzz_generator_main()
        






    







