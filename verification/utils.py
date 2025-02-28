import csv

def save_to_csv(name, matrix):
    with open(name+".csv", "w", newline="") as file:
        writer = csv.writer(file)
        writer.writerows(matrix)

def read_from_csv(name):
    with open(name+".csv", newline="") as file:
        reader = csv.reader(file)
        matrix = [row for row in reader]
    return matrix  