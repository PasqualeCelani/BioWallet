import argparse
from random import choices
from random import choice
import utils


def ImpostorGenuineSetup(matrix, impostor_genuine_probability):
    number_impostors = 0
    number_genuine = 0
    claims = []

    for i in range(1, len(matrix)):
        identity = matrix[i][0].split("_")[0]
        impostor = choices([True, False], impostor_genuine_probability)[0]
        claim = identity
        if impostor:
            identities = {matrix[0][i].split("_")[0] for i in range(1, len(matrix[0])) if matrix[0][i].split("_")[0] != identity}
            claim = choice(list(identities))
            number_impostors += 1
        else:
            number_genuine += 1
        headers = [i for i in range(1, len(matrix[0])) if matrix[0][i].split("_")[0] == claim]
        max_similarity = -1
        for j in headers:
            similarity = float(matrix[i][j])
            if similarity > max_similarity:
                max_similarity = similarity
        claims.append([impostor, max_similarity])
    return {'impostors':number_impostors, 'genuine':number_genuine, 'claims':claims}

def benchmark(similarity_matrix_name, result_name, impostor_genuine_probability):
    matrix = utils.read_from_csv("./SimilarityMatrixes/"+similarity_matrix_name)
    setup = ImpostorGenuineSetup(matrix, impostor_genuine_probability)
    number_impostors = setup["impostors"]
    number_genuine = setup["genuine"]
    t = 0.0
    result = [["Threshold", "FAR", "FRR"]]
    while t <= 1.0:
        fa, fr = 0,0
        for claim in setup["claims"]:
            max_similarity = round(claim[1],3)
            impostor = claim[0]
            if t <= max_similarity and impostor:
                fa+=1
            if t > max_similarity and not impostor:
                fr+=1
        result.append([t, fa/number_impostors, fr/number_genuine])
        t  = round(t+0.005,3)
    utils.save_to_csv("./BenchmarkResult/"+result_name, result)

def main():
    parser = argparse.ArgumentParser()

    parser.add_argument("--similarity_matrix_name", type=str, required=True)
    parser.add_argument("--output_file_name", type=str, required=True)
    parser.add_argument("--impostor_probability", type=float, required=True)
    parser.add_argument("--genuine_probability", type=float, required=True)

    args = parser.parse_args()

    similarity_matrix_name = args.similarity_matrix_name
    output_file_name = args.output_file_name

    impostor_probability = args.impostor_genuine_probability
    genuine_probability = args.genuine_probability
    if (impostor_probability < 0 and impostor_probability > 1) or (genuine_probability < 0 or genuine_probability > 1):
        raise Exception("The required value is a probability so it must be within the [0,1] range") 
    impostor_genuine_probability = [impostor_probability, genuine_probability]

    benchmark(similarity_matrix_name, output_file_name, impostor_genuine_probability)

if __name__ == "__main__":
    main()