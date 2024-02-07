# import math library
import math


# defining a function
# for round_half_down
def round_half_down(n, decimals=0):
    multiplier = 10 ** decimals
    return math.ceil(n * multiplier - 0.5) / multiplier


# passing different values to the function
print(round_half_down(48.41666666666667))
print(round_half_down(-2.5))
print(round_half_down(2.25, 1))
